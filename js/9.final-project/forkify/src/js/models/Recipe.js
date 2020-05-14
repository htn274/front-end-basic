import axios from 'axios'

export default class Recipe {
    /* Recipe structure
        image_url: "http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg"
        publisher: "101 Cookbooks"
        publisher_url: "http://www.101cookbooks.com"
        recipe_id: "47746"
        social_rank: 100
        source_url: "http://www.101cookbooks.com/archives/001199.html"
        title: "Best Pizza Dough Ever"
    */
    constructor (id){
        this.id = id;
    }

    async getRecipe(){
        try {
            const recipe = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.img_url = recipe.data.recipe.image_url;
            this.publisher = recipe.data.recipe.publisher;
            this.publisher_url = recipe.data.recipe.publisher_url;
            this.source_url = recipe.data.recipe.source_url;
            this.title = recipe.data.recipe.title;
            this.ingredients = recipe.data.recipe.ingredients;
        } catch (e)
        {
            console.log(e);
            alert('Error get recipe!')
        }
    }

    calTime()
    {
        let numIngre = this.ingredients.length;
        this.time = Math.ceil(numIngre/3) * 15;
    }

    calServings()
    {
        this.servings = 4;
    }

    parseIngredients()
    {
        const longUnits = ['tablespoons', 'tablespoon', 'teaspoons', 'teaspoon', 'cups', 'ounces',
                            'ounce', 'pounds'];
        const shortUnits = ['tbps', 'tbps', 'tsp', 'tsp', 'cup', 'oz', 'oz', 'pound'];
        const newIngredients = this.ingredients.map(el => {
            let ingredient = el.toLowerCase();
            // Uniform units
            longUnits.forEach((unit, i) => ingredient = ingredient.replace(unit, shortUnits[i]));
            // Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, '');
            // Format ingrediet to unit, number, name

            const arrIngred = ingredient.split(' ');
            const unitIndex = arrIngred.findIndex(el2 => shortUnits.includes(el2));

            let objIng;
            if (unitIndex > -1)
            {
                const arrCount = arrIngred.slice(0, unitIndex);
                let count;
                if (arrCount.length === 1)
                {
                    count = eval(arrCount[0].replace('-', '+'));
                }
                else 
                {
                    count = eval(arrCount.join('+'));
                }
                objIng = {
                    unit: arrIngred[unitIndex],
                    count,
                    ingredient: arrIngred.slice(unitIndex + 1).join(' ')
                }
            }
            else if (parseInt(arrIngred[0], 10))
            {
                // No unit, number in the 1st position
                objIng = {
                    unit: '',
                    count: parseInt(arrIngred[0], 10),
                    ingredient: ingredient.slice(1)
                }
            }
            else if (unitIndex === -1)
            {
                // No unit 
                objIng = {
                    unit: '',
                    count: 1,
                    ingredient
                }
            }

            return objIng;
        });

        this.ingredients = newIngredients;
    }

    updateServings(type)
    {
        const newServings = type === 'dec'? this.servings - 1 : this.servings + 1;
        this.ingredients.forEach(el => {
            el.count *= (newServings/this.servings);
        })
        this.servings = newServings;
    }
}