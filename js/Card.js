import Request from "./Request.js";

export default class Card {
    constructor({name, email, title, body, id}) {
        this.data = {name, email, title, body, postId: id};
        this.element = document.createElement("div");
        this.cardTitle = document.createElement("h5");
        this.cardText = document.createElement("p");
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
        this.cardTitle.classList.add("card-title");
        this.cardTitle.innerText = `${this.data.title}`;
        const editTitle = document.createElement("span");
        editTitle.classList.add("titleEdit");
        this.cardText.classList.add("card-text");
        this.cardText.innerText = `${this.data.body}`
        const editText = document.createElement("span");
        editText.classList.add("textEdit");
        const removeBtn = document.createElement("button");
        removeBtn.className = "btn btn-danger post_remove_btn";
        removeBtn.innerText = "Удалить пост";
        removeBtn.addEventListener("click", this.removeCard)
        body.append(this.cardTitle);
        body.append(editTitle);
        body.append(this.cardText);
        body.append(editText);
        body.append(removeBtn);
        this.element.append(body);
        output.append(this.element);
    }
    removeCard = () => {
        Request.deleteItem(`https://ajax.test-danit.com/api/json/posts/${this.data.postId}`).then(() => this.element.remove());

    }
    editCard = () => {

    }
}