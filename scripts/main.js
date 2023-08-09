import {SHOP_BASE} from "./shop_items.js";

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



//Shop variables
const arrowLeft = document.querySelector('.slider-controls__arrow--left');
const arrowRight = document.querySelector('.slider-controls__arrow--right');
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

//Shop slider functional
let addSliderContent = () => {
  item.shopItemImg.src = SHOP_BASE[itemNum].imgUrlDesktop;
  item.dropMenu.childNodes[1].childNodes[3].innerHTML = SHOP_BASE[itemNum].bluetoothVersion;
  item.dropMenu.childNodes[3].childNodes[3].innerHTML = SHOP_BASE[itemNum].range;
  item.dropMenu.childNodes[5].childNodes[3].innerHTML = SHOP_BASE[itemNum].charger;
  item.dropMenu.childNodes[7].childNodes[3].innerHTML = SHOP_BASE[itemNum].weight;
  item.dropMenu.childNodes[9].childNodes[3].innerHTML = SHOP_BASE[itemNum].guarantee;
  item.shopHeader.innerHTML = SHOP_BASE[itemNum].name;
  item.shopDescription.innerHTML = SHOP_BASE[itemNum].itemDescription;
  item.itemProperties.childNodes[1].childNodes[3].innerHTML = SHOP_BASE[itemNum].charger;
  item.itemProperties.childNodes[3].childNodes[3].innerHTML = SHOP_BASE[itemNum].weight + 'амм';
  item.itemPrice.innerHTML= SHOP_BASE[itemNum].price;
  item.orderBtn.href = SHOP_BASE[itemNum].orderBtnUrl;
};

arrowLeft.addEventListener('click', () => {
  itemNum--;
  if (itemNum < 0) {
    itemNum = SHOP_BASE.length - 1;
  }

  addSliderContent();
});

arrowRight.addEventListener('click', () => {
  itemNum++;
  if (itemNum >= SHOP_BASE.length) {
    itemNum = 0;
  }
  
  addSliderContent();
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
const teamContent = document.querySelectorAll('.employee__content');
const contentControl = document.querySelectorAll('.employee__control');

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
    } else {
      for (let n = 0; n < contentControl.length; n++) {
        teamContent[n].classList.remove('employee__content--active');
      }
      teamContent[i].classList.add('employee__content--active');
    }
    
  });
}






//Window resize events
window.addEventListener('resize', () => {

  //Add photo urls to team section
  let width = window.innerWidth;

  if (width <= tabletSize && !employeeTabPhoto[0].src.endsWith('.png')) {
    console.log('tab');
    addPhotoUrl(employeeTabPhoto, imgUrls, employeePhoto);
  } else if (width > tabletSize && !employeePhoto[0].src.endsWith('.png')){
    addPhotoUrl(employeePhoto, imgUrls, employeeTabPhoto);
    console.log('desktop');
  }
});