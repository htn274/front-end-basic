
import {elements} from './base';

export const getInput = () => elements.searchInput.value;

const litmitRecipeTitle = (title, limitLength = 17) => {
    const newTitle = [];
    if (title.length > limitLength)
    {   
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limitLength)
            {
                newTitle.push(cur);
            }
            return acc += cur.length;
        }, 0);
        // console.log(newTitle)
        return `${newTitle.join(' ')}...`;
    }
    return title;
}

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
                    <h4 class="results__name">${litmitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `

    elements.searchResList.insertAdjacentHTML('afterbegin', markup);
}

const createButton = (page, type) => {
    // Type = {prev, next}
    const markup = `
        <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev'?page - 1:page + 1}>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type==='prev'?'left':'right'}"></use>
            </svg> <span>Page ${type === 'prev'? page - 1: page + 1}</span>
        </button>
    `;
    return markup;
}

const renderButtonPage = (page, numPages) => {
    let button;
    if (page == 1 & numPages > 1)
    {
        // Next button
        button  = createButton(page, 'next');
    }
    else if (page < numPages)
    {
        // Both button
        button = `
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}
        `;
    }
    else if (page == numPages & numPages > 1)
    {
        // Prev button
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerResult = 10) => {
    const numPages = Math.ceil(recipes.length / resPerResult);
    const start = (page - 1) * resPerResult;
    const end = page * resPerResult;
    recipes.slice(start, end).forEach(renderSingleRecipe);
    renderButtonPage(page, numPages);
}

export const clearInput = () => elements.searchInput.value = '';

export const clearSearchRes = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

