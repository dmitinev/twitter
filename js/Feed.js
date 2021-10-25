import Request from "./Request.js";
import Card from "./Card.js";

export default class Feed {
   constructor() {
      this.listCards = [];
      this.loader = document.createElement("div");
   }

   renderLoader(outputElem) {
      const output = document.querySelector(outputElem);
      this.loader.className = "lds-dual-ring";
      output.append(this.loader);
   }

   async createFeed() {
      try {
         this.renderLoader(".main_content");
         const users = await Request.getInfo("https://ajax.test-danit.com/api/json/users");
         console.log(users)
         for (const {id, name, email} of users) {
            const posts = await Request.getInfo(`https://ajax.test-danit.com/api/json/users/${id}/posts`);
            for (const {title, body, id} of posts) {
               this.listCards.push(new Card({name, email, title, body, id}));
            }
         }
      } catch (err) {
         console.log(err);
      }
      this.loader.remove();
      for (const card of this.listCards) {
         card.render(".main_content");
      }
   }

}