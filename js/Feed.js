import Request from "./Request.js";
import Card from "./Card.js";

export default class Feed {
   renderLoader(outputElem){

   }
   async createFeed(){
      try {
         const users = await Request.getInfo("https://ajax.test-danit.com/api/json/users");
         for (const {id, name, email} of users) {
            const posts = await Request.getInfo(`https://ajax.test-danit.com/api/json/users/${id}/posts`);
            for (const {title, body, id} of posts) {
               const card = new Card({name, email, title, body, id});
               card.render(".main_content");
            }
         }
      }
      catch (err) {
         console.log(err);
      }

   }

}