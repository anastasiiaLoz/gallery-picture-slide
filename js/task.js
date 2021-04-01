import gallery from './gallery.js'

// console.log(gallery);

const refs = {
    galleryPlaceholder: document.querySelector('.js-gallery'),
    biggerPicture: document.querySelector(".lightbox__image"),
    modalWindow: document.querySelector(".js-lightbox"),
    overlay: document.querySelector('.lightbox__overlay'),
    closeBtn: document.querySelector('.lightbox__button'),

}

gallery.forEach((el, index) => {
    let galleryList = 
    `<li class="gallery__item">
    <a
        class="gallery__link"
        href="${el.original}"
    >
        <img
        class="gallery__image"
        src="${el.preview}"
        data-source="${el.original}"
        alt="${el.description}"
        data-index="${index}"
        />
    </a>
    </li>`
    refs.galleryPlaceholder.insertAdjacentHTML("afterbegin", galleryList);
})

const createModalMarkup = (e) => {
    e.preventDefault();

    if(e.target.nodeName !== 'IMG') {
        return 
    }

    refs.biggerPicture.src = e.target.dataset.source;
    refs.biggerPicture.alt = e.target.alt;
    onModalOpen();
}

const onModalOpen = () => {
    refs.modalWindow.classList.add('is-open');
    window.addEventListener('keydown', onEscClick);
    window.addEventListener('keydown', onArrowClick);
}

const closeModal = (e) => {
    refs.modalWindow.classList.remove('is-open');
    refs.biggerPicture.src = '';
    refs.biggerPicture.alt = '';
    window.removeEventListener('keydown', onEscClick)
    window.removeEventListener('keydown', onArrowClick)
}

const onEscClick = (e) => {
    if (e.key === 'Escape'){
        closeModal();
    }
}

const onOverlayClick = (e) => {
    if (e.target === refs.overlay){
        closeModal();
    }
}

const onArrowClick = (e) => {
    let i = +e.target.firstElementChild.dataset.index
    if(e.key === 'ArrowLeft' && i>0) {
        console.log('left');
        i-=1
        slider(e,i);
    }
    else if(e.key ==='ArrowLeft' && i===0){
        i = gallery.length -1
        slider(e, i);
    }
    else if (e.key === 'ArrowRight' && i<gallery.length -1){
        console.log('right');
        i+=1
        slider(e,i);
    }
    else if (e.key === 'ArrowRight' && i=== gallery.length -1){
        i = 0
        slider(e,i)
    }
}

const slider = (e, index) => {
    e.target.firstElementChild.dataset.index = index;
    refs.biggerPicture.src = gallery[index].original
}

refs.galleryPlaceholder.addEventListener('click', createModalMarkup)
refs.closeBtn.addEventListener('click', closeModal);
refs.modalWindow.addEventListener('click', onOverlayClick)