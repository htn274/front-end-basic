import uniqid from 'uniqid'

export default class List {
    constructor (){
        this.items = [];
    }

    addItem(count, unit, ingredient)
    {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        };
        this.items.push(item);
        return item;
    }

    delete(id)
    {
        const index = this.items.findIndex(el=> el.id == id);
        return this.items.splice(index, 1);
    }

    updateCount(id, newCount)
    {
        let item = this.items.find(el => el.id == id);
        item.count = newCount;
        return item;
    }
}