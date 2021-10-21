import Request from "./Request.js";

export default class Card {
    constructor({name, email, title, body, id}) {
        this.data = {name, email, title, body, postId: id};
        this.element = document.createElement("div");
    }
    render(outputElem){
        const output = document.querySelector(outputElem);
        this.element.classList.add("card");
        const header = document.createElement("div");
        header.classList.add("card-header");
        header.innerText = `${this.data.name}, ${this.data.email}`;
        this.element.prepend(header);
        const body = document.createElement("div");
        body.classList.add("card-body");
        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.innerText = `${this.data.title}`;
        const cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.innerText = `${this.data.body}`
        const removeBtn = document.createElement("button");
        removeBtn.className = "btn btn-danger post_remove_btn";
        removeBtn.innerText = "Удалить пост";
        removeBtn.addEventListener("click", this.removeCard)
        body.append(cardTitle);
        body.append(cardText);
        body.append(removeBtn);
        this.element.append(body);
        output.append(this.element);
    }
    removeCard = () => {
        console.log(this)
        Request.deleteItem(`https://ajax.test-danit.com/api/json/posts/${this.data.postId}`).then(() => this.element.remove());

    }
}