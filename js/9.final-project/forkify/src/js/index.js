// Global app controller
import Search from './models/Search'
import Recipe from './models/Recipe'
import {elements, renderLoader, clearLoader} from './views/base'
import * as searchView from './views/searchView'

const state = {}

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

const recipeController = async () => {
    let rId = window.location.hash.replace('#', '');
    if (rId)
    {
        // Create recipe
        state.recipe = new Recipe(rId);
        // Get recipe
        await state.recipe.getRecipe();

        // Prepare for the UI

        // Calculate time cooking and serving people
        state.recipe.calTime();
        state.recipe.calServings();

        // Display to UI
        window.r = state.recipe;
        // console.log(state.recipe);
    }
    
}

window.addEventListener('hashchange', recipeController);
window.addEventListener('load', recipeController);  
window.addEventListener('load', searchCotroller);