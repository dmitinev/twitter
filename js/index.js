import Feed from "./Feed.js"

window.addEventListener("load", () => {
   const {createFeed} = new Feed();
   createFeed();
})