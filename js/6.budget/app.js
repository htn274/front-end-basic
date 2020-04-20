var budgetController = (function(){
    var Expense = function(id, desc, value)
    {
        this.id = id;
        this.desc = desc;
        this.value = value;

        this.calculatePercentage = function(totalInc)
        {
            if (totalInc > 0)
            {
                this.percentage = Math.round((this.value/totalInc) * 100);
            }
            else 
                this.percentage = -1;
        }

        this.getPercentage = function()
        {
            return this.percentage;
        }
    };

    var Income = function(id, desc, value)
    {
        this.id = id;
        this.desc = desc;
        this.value = value;
    };

    data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc : 0
        },
        budget : 0,
        percentage: -1
    }

    var calculateTotal = (function(type){
        var sum = 0;
        data.allItems[type].forEach(function(cur){
            sum += cur.value;
        });

        data.totals[type] = sum;
    });

    return {
        addNewItems: (function(type, desc, value){
            ID = 0;
            if (data.allItems[type].length > 0)
            {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }
            var newItems;
            if (type == 'exp')
            {
                newItems = new Expense(ID, desc, value);
            }
            else if (type == 'inc')
            {
                newItems = new Income(ID, desc, value);
            }

            data.allItems[type].push(newItems);
            
            return newItems;
        }),
        deleteItem : (function(type, id){
            // Get the index of item which have id = 'id'
            var ids = data.allItems[type].map(function(curr){
                return curr.id;
            });
            var index = ids.indexOf(id);
            if (index !== -1)
            {
                data.allItems[type].splice(index, 1);
            }
        }),
        testing: (function(){
            console.log(data);
        }),
        calculateBudget: (function(){
            calculateTotal('inc');
            calculateTotal('exp');

            data.budget = data.totals['inc'] - data.totals['exp'];
            if (data.totals['inc'] > 0)
            {
                data.percentage = Math.round((data.totals['exp']/data.totals['inc']) * 100);
            }
            else 
                data.percentage = -1;
        }),
        getBudget: (function(){
            return {
                budget: data.budget,
                income: data.totals['inc'],
                expense: data.totals['exp'],
                percentage: data.percentage,
            }
        }),
        calculatePercentages : (function(){
            data.allItems['exp'].forEach(function(cur){
                cur.calculatePercentage(data.totals['inc']);
            })
        }),
        getPercentages: (function(){
            var percentages = [];
            data.allItems['exp'].map(function(element){
                percentages.push(element.getPercentage());
            })
            return percentages;
        }),
    }
})();

var UIController = (function(){

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        btnAdd: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetTotalDisplay: '.budget__value',
        incomeValueDisplay: '.budget__income--value',
        expensesValueDisplay: '.budget__expenses--value',
        expensesPercentageDisplay: '.budget__expenses--percentage',
        container : '.container',
        percentageLabel: '.item__percentage',
        dateLabel : '.budget__title--month',
    };

    var formatNumber = function(num)
    {
        num = Math.abs(num);
        num = num.toFixed(2);
        var numStr = num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "0,")

        return numStr;
    }

    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseInt(document.querySelector(DOMstrings.inputValue).value)
            };
        },
        getDOMstrings: function(){
            return DOMstrings;
        },
        addListItem: function(obj, type){
            var htmlStr, element;
            if (type == 'inc')
            {
                element = DOMstrings.incomeContainer;
                htmlStr = '<div class="item clearfix" id="inc-%id%">\
                <div class="item__description">%desc%</div>\
                <div class="right clearfix"><div class="item__value">+ %value%</div>\
                <div class="item__delete"><button class="item__delete--btn">\
                <i class="ion-ios-close-outline"></i></button></div</div></div>';
            }
            else if (type == 'exp')
            {
                element = DOMstrings.expensesContainer;
                htmlStr = '<div class="item clearfix" id="exp-%id%">'+
                '<div class="item__description">%desc%</div>'+
                '<div class="right clearfix">'+
                    '<div class="item__value">- %value%</div>' +
                    '<div class="item__percentage">21%</div>'+
                    '<div class="item__delete">'+
                        '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>'+
                    '</div></div></div>';
            }

            var newHtml = htmlStr.replace('%id%', obj.id);
            newHtml = newHtml.replace('%desc%', obj.desc);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value));

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        deleteItem : function(selectorID)
        {
            var item = document.getElementById(selectorID);
            item.parentNode.removeChild(item);
        },
        clearInput: function(){
            var fields, fieldArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
            // pass fields to fieldArr
            fieldArr = Array.prototype.slice.call(fields);
            fieldArr.forEach(function(current, id, array){
                current.value = "";
            });
            fieldArr[0].focus();
            document.querySelector(DOMstrings.inputType).value = 'inc';
        },
        setBudgetValue: function(budgetInfo){
            document.querySelector(DOMstrings.incomeValueDisplay).innerHTML = ' + ' + formatNumber(budgetInfo.income);
            document.querySelector(DOMstrings.expensesValueDisplay).innerHTML = ' - ' + formatNumber(budgetInfo.expense);
            document.querySelector(DOMstrings.budgetTotalDisplay).innerHTML = formatNumber(budgetInfo.budget);
            if (budgetInfo.percentage != '-1')
            {
                document.querySelector(DOMstrings.expensesPercentageDisplay).innerHTML = budgetInfo.percentage + '%'; 
                document.querySelector(DOMstrings.expensesPercentageDisplay).style.visibility = "visible";   
            }
            else 
            {
                document.querySelector(DOMstrings.expensesPercentageDisplay).style.visibility = "hidden";
            }
        },
        displayPercentages: function(percentages){
            var fields = document.querySelectorAll(DOMstrings.percentageLabel);
            
            fields.forEach(function(item, id){
                if (percentages[id] > 0)
                        item.textContent = percentages[id] + '%';
                    else
                        item.textContent = '--';
            })
            // var nodeListForEach = function(list, callback)
            // {
            //     for (var i = 0; i < list.length; i++)
            //     {
            //         callback(list[i], i);
            //     }
            // };

            // nodeListForEach(fields, function(curr, id){
            //     if (percentages[id] > 0)
            //         curr.textContent = percentages[id] + '%';
            //     else
            //         curr.textContent = '--';
            // });
        },
        displayDate: function()
        {
            var now = new Date();
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            year = now.getFullYear();
            month = months[now.getMonth()];
            document.querySelector(DOMstrings.dateLabel).textContent = month + ' ' + year;
        },
        changeType : function()
        {
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ','+
                DOMstrings.inputValue
            );
        
            fields.forEach(function(curr){
                curr.classList.toggle('red-focus')
            });
            document.querySelector(DOMstrings.btnAdd).classList.toggle('red');
        }
    };
})();

var controller = (function(budgetCtrl, uiCtrl){

    var setupEventListener = (function(){
        var DOM = uiCtrl.getDOMstrings();
        document.querySelector(DOM.btnAdd).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(event){
            if (event.charCode == 13)
            {
                ctrlAddItem();
            }
        })

        document.querySelector(DOM.container).addEventListener('click', ctrDeleteItem);
        document.querySelector(DOM.inputType).addEventListener('change', uiCtrl.changeType);
    })
    
    var updateBudget = function()
    {
        // 1. Calculate the budget
        budgetController.calculateBudget()
        budgetTotals = budgetController.getBudget();
        // 2. Display the budget on the UI
        uiCtrl.setBudgetValue(budgetTotals);
    };

    var updatePercentages = function()
    {
        // 1. Calculate the percentages
        budgetCtrl.calculatePercentages();
        // 2 Get the percentages from Budget
        var percentages = budgetCtrl.getPercentages();
        // 3. Display the percentages on the UI
        uiCtrl.displayPercentages(percentages);
    }

    var ctrlAddItem = function()
    {
        // 1. Get the filed input data
        var input = uiCtrl.getInput();
        
        if (input.description != "" && !isNaN(input.value) && input.value > 0)
        {
            // 2. Add the item to the budget controller
            var newItems = budgetController.addNewItems(input.type, input.description, input.value);
        
            // 3. Add the item to the UI 
            uiCtrl.addListItem(newItems, input.type);
            uiCtrl.clearInput();
        
            // 4. Update budget
            updateBudget();

            //5. Update percentage
            updatePercentages();
        }
    };

    var ctrDeleteItem = function(event)
    {   
        var itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (itemID)
        {
            var splitID = itemID.split('-');
            var type = splitID[0];
            var id = parseInt(splitID[1]);
            // 1. Delete item from budget
            budgetCtrl.deleteItem(type, id);
            // 2. Delete item from UI
            uiCtrl.deleteItem(itemID);
            // 3. Update budget
            updateBudget();
            //4. Update percentage
            updatePercentages();
        }
    }

    return {
        init: function()
        {
            console.log('Application started!');
            uiCtrl.displayDate();
            setupEventListener();
            uiCtrl.setBudgetValue(budgetController.getBudget());
        }
    }
})(budgetController, UIController);

controller.init();