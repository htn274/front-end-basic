// Global app controller
import Search from './models/Search'
import Recipe from './models/Recipe'
import List from './models/List'
import {elements, renderLoader, clearLoader} from './views/base'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import * as listView from './views/listView'

const state = {};
window.state = state;

const searchCotroller = async () =>{
    // 1. Get the query from UI
    // const query = searchView.getInput(); 
    const query = 'pizza';
    if (query){
    // 2. Search model
    state.search = new Search(query);
    
    // 3. Prepare UI
    searchView.clearInput();
    searchView.clearSearchRes();
    renderLoader(elements.searchRes);

    try {
        // 4. Get the result from model
        await state.search.getResults();

        // 5. Display to the UI
        clearLoader();
        searchView.renderResults(state.search.results); 
    } catch (err){
        console.log(err);
        alert('Error in Searching...')
    }
}
}

elements.searchForm.addEventListener('submit', (e)=>
{
    e.preventDefault();
    searchCotroller();
}
);

elements.searchResPages.addEventListener('click', e => {
    const button = e.target.closest('.btn-inline');
    if (button)
    {
        const gotoPage = parseInt(button.dataset.goto, 10);
        searchView.clearSearchRes();
        searchView.renderResults(state.search.results, gotoPage);
    }
})

const listController = () => {
    if (!state.list) state.list = new List();

    // Render item
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    })
}

elements.shoppingList.addEventListener('click', e=> {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    if (e.target.matches('.shopping__delete, .shopping__delete *'))
    {
        listView.deleteItem(id);
        state.list.delete(id);
    }
    if (e.target.matches('.shopping__count-value'))
    {
        const value = e.target.value;
        state.list.updateCount(id, value);
        console.log(value);
    }
})

const recipeController = async () => {
    let rId = window.location.hash.replace('#', '');
    // Prepare for UI
    recipeView.clearView();
    renderLoader(elements.recipeRes);
    if (rId)
    {
        if (state.search)
        {
            searchView.hightlightSelected(rId);
        }

        // Create recipe
        state.recipe = new Recipe(rId);
        try {
            // Get recipe
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            // Calculate time cooking and serving people
            state.recipe.calTime();
            state.recipe.calServings();

            // Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe)
        } 
        catch (err)
        {
            console.log(err);
        }
        
    }
    
}

// Update ingredients when increase or decrease number of servings
elements.recipeRes.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *'))
    {
        if (state.recipe.servings > 1)
        {
            state.recipe.updateServings('dec');
            recipeView.updateServings(state.recipe);
        }
    }
    else if (e.target.matches('.btn-increase, .btn-increase *'))
    {
        state.recipe.updateServings('inc');
        recipeView.updateServings(state.recipe);
    }
    else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *'))
    {
        listController();
    }
})

window.addEventListener('hashchange', recipeController);
window.addEventListener('load', recipeController);  
window.addEventListener('load', searchCotroller);
