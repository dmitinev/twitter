import Request from "./Request.js";

export default class Card {
    constructor({name, email, title, body, id}) {
        this.data = {name, email, title, body, postId: id};
        this.element = document.createElement("div");
        this.cardTitle = document.createElement("h5");
        this.cardText = document.createElement("p");
        this.editTitle = document.createElement("i");
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
        this.editTitle.className = "fas fa-pen fa-lg";
        this.cardText.classList.add("card-text");
        this.cardText.innerText = `${this.data.body}`
        const removeBtn = document.createElement("button");
        removeBtn.className = "btn btn-danger post_remove_btn";
        removeBtn.innerText = "Удалить пост";
        removeBtn.addEventListener("click", this.removeCard)
        this.editTitle.addEventListener("click", this.editCard)
        body.append(this.cardTitle);
        body.append(this.editTitle);
        body.append(this.cardText);
        body.append(removeBtn);
        this.element.append(body);
        output.append(this.element);
    }
    removeCard = () => {
        Request.deleteItem(`https://ajax.test-danit.com/api/json/posts/${this.data.postId}`).then(() => this.element.remove());

    }
    editCard = () => {
        const saveIcon = document.createElement("i");
        saveIcon.className = "fas fa-save";
        this.editTitle.replaceWith(saveIcon);
        const editTitleField = document.createElement("input");
        editTitleField.setAttribute("type", "text");
        editTitleField.classList.add("title-edit-field");
        editTitleField.value = this.cardTitle.innerText;
        this.cardTitle.replaceWith(editTitleField);
        const editText = document.createElement("textarea");
        editText.setAttribute("rows", "7");
        editText.setAttribute("cols", "50");
        editText.classList.add("text-edit-field");
        editText.value = this.cardText.innerText;
        this.cardText.replaceWith(editText);
        saveIcon.addEventListener("click", ()=>{
            Request.changeCardData(`https://ajax.test-danit.com/api/json/posts/${this.data.postId}`, {...this.data, title:editTitleField.value, body:editText.value})
               .then((response) => response.json()).then(data => console.log(data));
        })
    }
}