import Request from "./Request.js";
import Card from "./Card.js";

const template = document.querySelector("#card_template").innerHTML;
const output = document.querySelector(".main_content");
const request = new Request();

request.getInfo("https://ajax.test-danit.com/api/json/users")
    .then(usersArray => {
        usersArray.forEach(({id, name, email}) => {
            request.getInfo(`https://ajax.test-danit.com/api/json/users/${id}/posts`).then(data => {
                data.forEach(({title, body}) => {
                    const post = new Card({name, email, title, body});
                    post.render(template, output);
                })
            });
        })
    });

console.log(posts);