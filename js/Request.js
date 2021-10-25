export default class Request {
   static getInfo(url) {
      return fetch(url)
         .then(response => response.json());
   }

   static deleteItem(url) {
      return fetch(url, {
         method: "DELETE",
      });
   }

   static changeCardData(url, body) {
      return fetch(url, {
         method: "PUT",
         body: JSON.stringify({body}),
         headers: {
            'Content-Type': 'application/json',
         }
      })
   }
}