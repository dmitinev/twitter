import Request from "./Request.js";
import Card from "./Card.js";

window.addEventListener("load", () => {

    Request.getInfo("https://ajax.test-danit.com/api/json/users")
        .then(usersArray => {
            usersArray.forEach(({id, name, email}) => {
                Request.getInfo(`https://ajax.test-danit.com/api/json/users/${id}/posts`).then(data => {
                    data.forEach(({title, body, id}) => {
                        const post = new Card({name, email, title, body, id});
                        post.render(".main_content");
                    })
                });
            })
        });
})