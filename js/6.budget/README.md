# To-do list

CONTROLLER MODULE

- [x] Add event handler

UI MODULE

- [x] Get input values
- [x] Add the new item to the UI
- [x] Update the UI

DATA MODULE

- [x] Calculate the budget
- [x] Add the new items to our data structure

#MODULE PATERN

Để tuân thủ nguyên tắc escapsulation. Các biến và hàm trong 1 module đều là private. Nó sẽ được public khi ta return 1 object về.

Ví dụ: module budgetController

```js
var budgetController = (function(){
    var x = 23;

    var add = function(b)
    {
        return x + b;
    }

    return {
        publicTest: function(b){
            console.log(add(b))
        };
    }
}());
```

x và method add là private. Để truy cập vào nó, ta đã trả về 1 object có method là publicTest. Tận dụng cơ chế IFF và Closure;

```js
budgetController.x; //error
budgetController.add(2) //error
budgetController.publicTest(3) //ok
```
