export default class Card {
    constructor({name, email, title, body}) {
        this.data = {name, email, title, body};
    }
    render(template, outputElem){
        outputElem.insertAdjacentHTML("beforeend", Mustache.render(template, this.data));
    }
}