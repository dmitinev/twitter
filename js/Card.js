import Request from "./Request.js";

export default class Card {
    constructor({name, email, title, body, id}) {
        this.data = {name, email, title, body, postId: id};
        this.element = document.createElement("div");
        this.header = document.createElement("div");
        this.cardBody = document.createElement("div");
        this.removeBtn = document.createElement("button");
        this.cardTitle = document.createElement("h5");
        this.cardText = document.createElement("p");
        this.editTitle = document.createElement("i");
    }
    render(outputElem, edited= false){
        const output = document.querySelector(outputElem);
        this.element.classList.add("card");
        this.header.classList.add("card-header");
        this.header.innerText = `${this.data.name}, ${this.data.email}`;
        this.element.prepend(this.header);
        this.cardBody.classList.add("card-cardBody");
        this.cardTitle.classList.add("card-title");
        this.cardTitle.innerText = `${this.data.title}`;
        this.editTitle.className = "fas fa-pen fa-lg";
        this.cardText.classList.add("card-text");
        this.cardText.innerText = `${this.data.body}`
        this.removeBtn.className = "btn btn-danger post_remove_btn";
        this.removeBtn.innerText = "Удалить пост";
        this.removeBtn.addEventListener("click", this.removeCard)
        this.editTitle.addEventListener("click", this.editCard)
        this.cardBody.append(this.cardTitle);
        this.cardBody.append(this.editTitle);
        this.cardBody.append(this.cardText);
        this.cardBody.append(this.removeBtn);
        this.element.append(this.cardBody);
        if (edited){
            output.prepend(this.element);
        }
        else {
            output.append(this.element);
        }
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
            Request.changeCardData(`https://ajax.test-danit.com/api/json/posts/${this.data.postId}`, {...this.data, title: editTitleField.value, body: editText.value})
               .then((response) => response.json()).then(jsonData => {
                this.data = jsonData.body;
                this.element.remove();
                saveIcon.remove();
                editText.remove();
                editTitleField.remove();
                this.render(".main_content", true);
            });
        })
    }
}