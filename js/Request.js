export default class Request {
    static getInfo(url){
        return fetch(url)
            .then(response => response.json());
    }
    static deleteItem(url){
        return fetch(url, {
            method: "DELETE",
        });
    }
}