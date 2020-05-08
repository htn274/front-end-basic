
import {elements} from './base';

export const getInput = () => elements.searchInput.value;

const renderSingleRecipe = (recipe) => {
    /* Recipe structure
        image_url: "http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg"
        publisher: "101 Cookbooks"
        publisher_url: "http://www.101cookbooks.com"
        recipe_id: "47746"
        social_rank: 100
        source_url: "http://www.101cookbooks.com/archives/001199.html"
        title: "Best Pizza Dough Ever"
    */
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipe.title}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `

    elements.searchResList.insertAdjacentHTML('afterbegin', markup);
}

export const rederResults = (recipes) => {
    recipes.forEach(renderSingleRecipe);
}

export const clearInput = () => elements.searchInput.value = '';

export const clearSearchRes = () => elements.searchResList.innerHTML = '';