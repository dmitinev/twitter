import Request from "./Request.js";
import Card from "./Card.js";

window.addEventListener("load", () => {
    const request = new Request();

    request.getInfo("https://ajax.test-danit.com/api/json/users")
        .then(usersArray => {
            usersArray.forEach(({id, name, email}) => {
                request.getInfo(`https://ajax.test-danit.com/api/json/users/${id}/posts`).then(data => {
                    data.forEach(({title, body}) => {
                        const post = new Card({name, email, title, body});
                        post.render(".main_content");
                    })
                });
            })
        });
})