export default class Likes{
    constructor (){
        this.likes = [];
    }

    addLike(id, title, author, img){
        const newLike = {id, title, author, img};
        this.likes.push(newLike);
        return newLike;
    }

    deleteLike(id)
    {
        const index = this.likes.findIndex(el=> el.id == id);
        return this.likes.splice(index, 1);
    }   
    
    isLike(id)
    {
        return this.likes.findIndex(el => el.id == id) !== -1;
    }

    numLikes()
    {
        return this.likes.length;
    }
}