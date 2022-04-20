import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import './sass/main.scss';
import refs from './JS/refs';
import Api from './JS/apiService';
import Notiflix from "notiflix";



const API = new Api()

refs.form.addEventListener('submit', getData )
refs.button.addEventListener('click', onLoadMore)


async function getData(event) {
    event.preventDefault()
    API.resetPage()
    const query = refs.form.elements.query.value  
    if(API.getValue() === query) {
      Notiflix.Notify.warning('Картинки по такому запросу уже существуют')
      return
    }  
    API.setValue(query)  
    refs.gallery.innerHTML = ''  
    const data = await API.getImages(query)
    if(data.hits.length < 1) {
      Notiflix.Notify.warning('По вашему запросу ничего не найденно')
    } 
    initModal()
    renderMarkup(data.hits)
    if(data.hits.length > 19) {
      refs.button.style.display = 'block'   
    }
  
}

function renderMarkup(data) {
    const pictures = data.map(el => {
            return   ` 
                <a class="photo-card"  link="${el.largeImageURL}">
                <img class="photo-card__img" src="${el.webformatURL}" alt="${el.id}" loading="lazy" />
                <ul class="info">
                <li>
                  <p class="info-item">
                    <b>Likes</b>
                  </p>
                  <p>${el.likes}</p>
                </li>
                <li>
                  <p class="info-item">
                    <b>Views</b>
                  </p>
                  <p>${el.views}</p>
                </li>
                <li>
                  <p class="info-item">
                    <b>Comments</b>
                  </p>
                  <p>${el.comments}</p>
                </li>
                <li>
                  <p class="info-item">
                    <b>Downloads</b>
                  </p>
                  <p>${el.downloads}</p>
                </li>
              </ul>
                 </a>`
      }).join('')
      refs.gallery.insertAdjacentHTML('beforeend', pictures) 
      refs.input.value = ''
      
}

async function onLoadMore() {
 API.incrementPage()
const data = await API.getImages()
if (data.hits.length < 1) {
  Notiflix.Notify.warning('Каритнки закончились')
}
renderMarkup(data.hits)
scrollToElement()
initModal()
}

function initModal() {
   return new SimpleLightbox('.gallery a', {
        captions: true,
        captionsData: 'alt',
        captionDelay:250,
        sourceAttr: 'link'
    });
}
function scrollToElement() {
  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 5,
  behavior: "smooth",
});
}


