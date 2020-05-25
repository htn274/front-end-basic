import {elements} from './base.js'
import {litmitRecipeTitle} from './searchView.js'

export const toogleLikeButton = (isLike) => {
    // icon-heart-outlined
    const iconString = isLike ? "icon-heart" : "icon-heart-outlined";
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
};

export const toogleLikeMenu = numLikes => {
    elements.likeMenu.style.visibility = numLikes > 0? "visible" : "hidden";
};

export const addLike = like => {
    const markup = `
    <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="${litmitRecipeTitle(like.title)}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${like.title}</h4>
                <p class="likes__author">${like.author}</p>
            </div>
        </a>
    </li>
    `
    elements.likesList.insertAdjacentHTML("beforeend", markup);
}

export const deleteLike = id => {
    const el = document.querySelector(`a[href*="#${id}"]`);
    if (el) el.parentElement.removeChild(el);
}