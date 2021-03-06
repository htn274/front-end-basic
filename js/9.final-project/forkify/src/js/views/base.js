export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages'),
    recipeRes: document.querySelector('.recipe'),
    shoppingList : document.querySelector('.shopping__list'),
    likeMenu: document.querySelector('.likes'),
    likesList: document.querySelector('.likes__list'),
};

export const elementStrings = {
    loader: 'loader',
}

export const renderLoader = (parent) => {
    const htmlLoader = `
        <div class=${elementStrings.loader}>
            <svg>
                <use href='img/icons.svg#icon-cw'></use>
            </svg>
        </div>
    `
    parent.insertAdjacentHTML('afterbegin', htmlLoader);
}

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    loader.parentNode.removeChild(loader);
}