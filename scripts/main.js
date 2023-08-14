import {SHOP_BASE} from "./shop_items.js";
import {USERS_BASE} from "./reviews_authors.js";

document.addEventListener("DOMContentLoaded", function (event) {
  console.log('DOM Content Loaded Successfully!');

  const tabletSize = 768;
  const screenWidth = window.innerWidth;
  const sections = document.querySelectorAll('.section');
  const body = document.querySelector('body');

  let removeClass = (arr, classToRemove) => {
    for (let n = 0; n < arr.length; n++) {
      arr[n].classList.remove(classToRemove);
    }
  };

  // Nav menu
  const fixedMenuLinks = document.querySelectorAll('.fixed-menu__link');
  const headerMeenuLinks = document.querySelectorAll('.menu__link--header');
  const modalMenuLinks = document.querySelectorAll('.menu__link--modal');
  let windowHeight = +getComputedStyle(sections[0]).height.split('px')[0];
  let windowPositionX;

  let addClass = (arr, classToAdd) => {
    for (let n = 0; n < arr.length; n++) {
      arr[n].classList.add(classToAdd);
    }
  };

  let addMenuClickEvent = function(linksArr, i) {
    linksArr[i].addEventListener('click', function(e) {    
      windowPositionX = windowHeight * i;

      removeClass(fixedMenuLinks, 'fixed-menu__link--active');

      fixedMenuLinks[i].classList.add('fixed-menu__link--active');

      if (windowPositionX >= windowHeight * 7 && windowPositionX < windowHeight * 8) {
        addClass(fixedMenuLinks, 'fixed-menu__link--white');
      } else {
        removeClass(fixedMenuLinks, 'fixed-menu__link--white');
      }
    });
  };

  for (let i = 0; i < fixedMenuLinks.length; i++) {  
    addMenuClickEvent(fixedMenuLinks, i);
  }

  for (let i = 0; i < headerMeenuLinks.length; i++) {  
    addMenuClickEvent(headerMeenuLinks, i);
    addMenuClickEvent(modalMenuLinks, i);
  }


  // Modal menu
  const hamburgerBtn = document.querySelector('.hamburger__checkbox');
  const modalWindow = document.querySelector('.modal--main');
  

  hamburgerBtn.addEventListener('click', () => {

    if(hamburgerBtn.checked) {
      modalWindow.classList.add('modal--main--active');
      body.style.overflow = 'hidden';
    } else {
      modalWindow.classList.remove('modal--main--active');
      body.style.overflow = 'visible';
    }

  });

  modalWindow.addEventListener('click', function(e){
    if(hamburgerBtn.checked) {
      modalWindow.classList.remove('modal--main--active');
      body.style.overflow = 'visible';
      hamburgerBtn.checked = false;
    }
  });


  // Shop section functional
  const arrowLeft = document.querySelector('.arrow--left');
  const arrowRight = document.querySelector('.arrow--right');
  const shopImgSlider = document.querySelector('.shop__img-wrapper');
  
  const shopContentSlider = document.querySelector('.shop__content');

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
  
  const addShopSliderContent = () => {
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

  const addNextImgSlide = (index, direction) => {
    let activeImg = document.querySelector('.shop__img--active');
    
    if(direction == 'toLeft') {
      if (index > SHOP_BASE.length - 1) {
        index = 0;      
      }
    }

    if(direction == 'toRight') {
      if (index < 0) {
        index = SHOP_BASE.length - 1;      
      }
    }

    let img = document.createElement('img');
      img.classList.add('shop__img');
      img.classList.add('shop__img--' + direction);
      img.src = SHOP_BASE[index].imgUrlDesktop;
      console.log(img);

      if(direction == 'toLeft') {
        shopImgSlider.append(img);
        img.addEventListener('load', () => {
          img.classList.remove('shop__img--' + direction);
          activeImg.classList.remove('shop__img--active');
          shopImgSlider.removeChild(activeImg);
          img.classList.add('shop__img--active');
        });
      }
      if(direction == 'toRight') {
        shopImgSlider.prepend(img);
        img.addEventListener('load', () => {
          img.classList.remove('shop__img--' + direction);
          shopImgSlider.removeChild(activeImg);
          img.classList.add('shop__img--active');
        });
      }
    
  };

  // const addNextContentSlide = (index) => {
    
  // };


  arrowLeft.addEventListener('click', () => {
    itemNum--;

    if (itemNum < 0) {
      itemNum = SHOP_BASE.length - 1;
    }

    addNextImgSlide(itemNum, 'toLeft');

    addShopSliderContent();
  });

  arrowRight.addEventListener('click', () => {
    itemNum++;

    if (itemNum >= SHOP_BASE.length) {
      itemNum = 0;
    }

    addNextImgSlide(itemNum, 'toRight');
    
    addShopSliderContent();
  });



  // Team section functional
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


  // Review section functional
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

  // Form section
  const form = document.querySelector('.form');
  const formSendBtn = document.querySelector('.form .btn');
  const formModal = document.querySelector('.modal--form');
  const modalOffBtn = document.querySelector('.btn--modal--off');
  const responseText = document.querySelector('.modal--form__text');

  formSendBtn.addEventListener('click', e => {
    e.preventDefault();

    

    if (validateFrom(form)) {

      responseText.classList.remove('modal--form__text--error');
      
      const data = {
        name: form.elements.name.value,
        phone: form.elements.phone.value,
        comment: form.elements.comment.value,
        to: form.elements.to.value
      };

      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send(JSON.stringify(data));
      
      xhr.addEventListener('progress', e => {

        if (e.target.status == 200) {

        const response = JSON.parse(xhr.response);
        responseText.textContent = response.message + "!";

        } else {

          responseText.textContent = "Ошибка запроса! Попробуйте позже!";
          responseText.classList.add('modal--form__text--error');
        
        }

        formModal.classList.add('modal--form--active');
        body.style.overflow = 'hidden';

      });

      xhr.addEventListener('error', e => {
        
        responseText.textContent = "Ошибка соединения!";
        responseText.classList.add('modal--form__text--error');
        formModal.classList.add('modal--form--active');
        body.style.overflow = 'hidden';

      });

    }


    function validateFrom(form) {
      let valid = true;

      if (!validateField(form.elements.name)) {
        valid = false;
      }

      if (!validateField(form.elements.phone)) {
        valid = false;
      }

      if (!validateField(form.elements.street)) {
        valid = false;
      }

      if (!validateField(form.elements.house)) {
        valid = false;
      }

      if (!validateField(form.elements.entrance)) {
        valid = false;
      }
      
      if (!validateField(form.elements.comment)) {
        valid = false;
      }

      return valid;
    }

    function validateField(element) {
      let isValid = true;
      if (element.value.trim() == '') {
        isValid = false;
        element.classList.add('form-input--warning');
      } else {
        element.classList.remove('form-input--warning');
      }

      return isValid;
    }
  });

  modalOffBtn.addEventListener('click', (e) => {
    formModal.classList.remove('modal--form--active');
    body.style.overflow = 'visible';
  });

  formModal.addEventListener('click', (e) => {
    if(e.target == formModal) {
      formModal.classList.remove('modal--form--active');
      body.style.overflow = 'visible';
    }
  });


  // Window scroll events
  

  // Window resize events
  window.addEventListener('resize', () => {

    // Add photo urls to team section
    let width = window.innerWidth;

    if (width <= tabletSize && !employeeTabPhoto[0].src.endsWith('.png')) {
      addPhotoUrl(employeeTabPhoto, imgUrls, employeePhoto);
    } else if (width > tabletSize && !employeePhoto[0].src.endsWith('.png')){
      addPhotoUrl(employeePhoto, imgUrls, employeeTabPhoto);
    }
  });



});