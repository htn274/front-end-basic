export default class Likes{
    constructor (){
        this.likes = [];
    }

    addLike(id, title, author, img){
        const newLike = {id, title, author, img};
        this.likes.push(newLike);
        this.addStorage();
        return newLike;
    }

    deleteLike(id)
    {
        const index = this.likes.findIndex(el=> el.id == id);
        this.likes.splice(index, 1);
        this.addStorage();
    }   
    
    isLike(id)
    {
        return this.likes.findIndex(el => el.id == id) !== -1;
    }

    numLikes()
    {
        return this.likes.length;
    }

    addStorage()
    {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage()
    {
        this.likes = JSON.parse(localStorage.getItem('likes'));
    }
}