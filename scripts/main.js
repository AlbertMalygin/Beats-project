const hamburgerBtn = document.querySelector('.hamburger__checkbox');
const modalWindow = document.querySelector('.modal');

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

