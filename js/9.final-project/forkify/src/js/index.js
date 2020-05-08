// Global app controller
import Search from './models/Search'
import {elements, renderLoader, clearLoader} from './views/base'
import * as searchView from './views/searchView'

const state = {}

const searchCotroller = async () =>{
    // 1. Get the query from UI
    const query = searchView.getInput(); 

    if (query){
    // 2. Search model
    state.search = new Search(query);
    
    // 3. Prepare UI
    searchView.clearInput();
    searchView.clearSearchRes();
    renderLoader(elements.searchRes);

    // 4. Get the result from model
    await state.search.getResults();

    // 5. Display to the UI
    clearLoader();
    searchView.renderResults(state.search.results); 
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