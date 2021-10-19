export default class Request {
    getInfo(url){
        return fetch(url)
            .then(response => response.json())
    }
}