// Global app controller
import Search from './models/Search'
import {elements} from './views/base'
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

    // 4. Get the result from model
    await state.search.getResults();

    // 5. Display to the UI
    searchView.rederResults(state.search.results); // TODO
}
}

elements.searchForm.addEventListener('submit', (e)=>
{
    e.preventDefault();
    searchCotroller();
}
);