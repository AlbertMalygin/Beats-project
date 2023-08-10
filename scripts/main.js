import {SHOP_BASE} from "./shop_items.js";
import {USERS_BASE} from "./reviews_authors.js";

const tabletSize = 768;
const MobileSize = 480;

const hamburgerBtn = document.querySelector('.hamburger__checkbox');
const modalWindow = document.querySelector('.modal');
const screenWidth = window.innerWidth;


hamburgerBtn.addEventListener('click', () => {
  if(hamburgerBtn.checked) {
    modalWindow.style.height = '100vh';
    modalWindow.style.opacity = '1';
  } else {
    modalWindow.style.height = '0vh';
    modalWindow.style.opacity = '0';
  }
});

window.addEventListener('scroll', () => {
  if(hamburgerBtn.checked) {
    modalWindow.style.height = '0vh';
    modalWindow.style.opacity = '0';
    hamburgerBtn.checked = false;
  }
});


//Shop section functional
const arrowLeft = document.querySelector('.arrow--left');
const arrowRight = document.querySelector('.arrow--right');
const item = {
  shopItemImg: document.querySelector('.shop__img'),
  dropMenu: document.querySelector('.dropdown-menu__list'),
  shopHeader: document.querySelector('.shop__header'),
  shopDescription: document.querySelector('.shop__desc'),
  itemProperties: document.querySelector('.item-prop'),
  itemPrice: document.querySelector('.shop-order__price'),
  orderBtn: document.querySelector('.order-btn')
};
let itemNum = 0;
item.shopItemImg.src = SHOP_BASE[0].imgUrlDesktop;



let addShopSliderContent = () => {
  item.shopItemImg.src = SHOP_BASE[itemNum].imgUrlDesktop;
  item.dropMenu.childNodes[1].childNodes[3].innerHTML = SHOP_BASE[itemNum].bluetoothVersion;
  item.dropMenu.childNodes[3].childNodes[3].innerHTML = SHOP_BASE[itemNum].range;
  item.dropMenu.childNodes[5].childNodes[3].innerHTML = SHOP_BASE[itemNum].charger;
  item.dropMenu.childNodes[7].childNodes[3].innerHTML = SHOP_BASE[itemNum].weight;
  item.dropMenu.childNodes[9].childNodes[3].innerHTML = SHOP_BASE[itemNum].guarantee;
  item.shopHeader.innerHTML = SHOP_BASE[itemNum].name;
  item.shopDescription.innerHTML = SHOP_BASE[itemNum].itemDescription;
  item.itemProperties.childNodes[1].childNodes[3].innerHTML = SHOP_BASE[itemNum].charger + 'аса';
  item.itemProperties.childNodes[3].childNodes[3].innerHTML = SHOP_BASE[itemNum].weight + 'амм';
  item.itemPrice.innerHTML= SHOP_BASE[itemNum].price;
  item.orderBtn.href = SHOP_BASE[itemNum].orderBtnUrl;
};

arrowLeft.addEventListener('click', () => {
  itemNum--;
  if (itemNum < 0) {
    itemNum = SHOP_BASE.length - 1;
  }

  addShopSliderContent();
});

arrowRight.addEventListener('click', () => {
  itemNum++;
  if (itemNum >= SHOP_BASE.length) {
    itemNum = 0;
  }
  
  addShopSliderContent();
});



//Team section functional
const imgUrls = [
                  './img/employee/boris.png',
                  './img/employee/alla.png',
                  './img/employee/kirill.png',
                  './img/employee/mila.png'
                ];
const employeePhoto = document.querySelectorAll('.employee__photo');
const employeeTabPhoto = document.querySelectorAll('.employee__tab-photo');
const teamContentWrapper = document.querySelectorAll('.employee__content-wrapper');
const teamContent = document.querySelectorAll('.employee__content');
const contentControl = document.querySelectorAll('.employee__control');
const contentControlStatus = document.querySelectorAll('.employee__status')

let addPhotoUrl = (photosArr, photosUrl, photosUrlForRemove) => {
  for (let i = 0; i < photosArr.length; i++) {
    photosArr[i].src = photosUrl[i];
    photosUrlForRemove[i].src = '';
  }
}


if (screenWidth <= tabletSize) {
  addPhotoUrl(employeeTabPhoto, imgUrls, employeePhoto);
} else {
  addPhotoUrl(employeePhoto, imgUrls, employeeTabPhoto);
}

for (let i = 0; i < contentControl.length; i++) {
  contentControl[i].addEventListener('click', () => {
    if (teamContent[i].classList.contains('employee__content--active')) {
      teamContent[i].classList.remove('employee__content--active');
      teamContentWrapper[i].classList.remove('employee__content-wrapper--active');
      contentControlStatus[i].classList.remove('employee__status--rotated');
    } else {
      for (let n = 0; n < contentControl.length; n++) {
        teamContent[n].classList.remove('employee__content--active');
        teamContentWrapper[n].classList.remove('employee__content-wrapper--active');
        contentControlStatus[n].classList.remove('employee__status--rotated');
      }
      teamContent[i].classList.add('employee__content--active');
      teamContentWrapper[i].classList.add('employee__content-wrapper--active');
      contentControlStatus[i].classList.add('employee__status--rotated');
    }
    
  });
}


//Review section functional
const user = {
  userImg: document.querySelector('.review__user-photo'),
  reviewHeader: document.querySelector('.review__title'),
  reviewText: document.querySelector('.review__text'),
  reviewAuthor: document.querySelector('.review__author-name'),
  sliderControlImgs: document.querySelectorAll('.reviews-switcher__author')
};
const sliderElems = document.querySelectorAll('.reviews-switcher__item');

user.userImg.src = USERS_BASE[0].userImg;
user.userImg.alt = USERS_BASE[0].userImg.split('/')[3].split('.')[0];
user.reviewHeader.textContent = USERS_BASE[0].reviewHeader;
user.reviewText.textContent = USERS_BASE[0].reviewText;
user.reviewAuthor.textContent = USERS_BASE[0].reviewAuthor;

for(let i = 0; i < USERS_BASE.length; i++) {
  user.sliderControlImgs[i].src = USERS_BASE[i].userImg;
  user.sliderControlImgs[i].alt = USERS_BASE[i].userImg.split('/')[3].split('.')[0];

  user.sliderControlImgs[i].addEventListener('click', function() {
    for(let n = 0; n < sliderElems.length; n++) {
      sliderElems[n].classList.remove('reviews-switcher__item--active');
    }
    user.userImg.src = USERS_BASE[i].userImg;
    user.userImg.alt = USERS_BASE[i].userImg.split('/')[3].split('.')[0];
    user.reviewHeader.textContent = USERS_BASE[i].reviewHeader;
    user.reviewText.textContent = USERS_BASE[i].reviewText;
    user.reviewAuthor.textContent = USERS_BASE[i].reviewAuthor;
    sliderElems[i].classList.add('reviews-switcher__item--active');
  });
}



//Window resize events
window.addEventListener('resize', () => {

  //Add photo urls to team section
  let width = window.innerWidth;

  if (width <= tabletSize && !employeeTabPhoto[0].src.endsWith('.png')) {
    addPhotoUrl(employeeTabPhoto, imgUrls, employeePhoto);
  } else if (width > tabletSize && !employeePhoto[0].src.endsWith('.png')){
    addPhotoUrl(employeePhoto, imgUrls, employeeTabPhoto);
  }
});