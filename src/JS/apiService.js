import axios from "axios"
import Notiflix from "notiflix"

export default class Api {
    constructor(){
        this.page = 1
        this.query = ''
    }
   async getImages() {
    const BASE_URL = `https://pixabay.com/api/?key=26842987-082bbd3c37dcbed35dbe75126&page=${this.page}&image_type=photo&q=`
    if(this.query === '') {
        Notiflix.Notify.warning('Нет запроса')
        return
    }
    const q = BASE_URL + this.query
    return await axios.get(q)
        .then(response => response.data)
        .catch(error => console.log(error))
    }
    incrementPage() {
           this.page += 1
    }
    setValue(value) {
        this.query = value
    }
    getValue() {
        return this.query
    }
    resetPage() {
        this.page = 1
    }
}



