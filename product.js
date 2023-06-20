'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 =  document.getElementById('section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const barToggle = document.getElementById('bar');
const navLinks = document.querySelector('.nav__links');
const navClose = document.querySelector('.nav--close');
const smallImg = document.querySelectorAll('.small-img')
const mainImg = document.getElementById('MainImg');
 
///////////////////////////////////////
// image slider
smallImg.forEach((s) => {
  s.addEventListener('click', function () {
    mainImg.src = s.src;
  })
})


// Burger Menu

const toggleBar = function(e) {
  e.preventDefault();

  if (navLinks.style.right === '-300px' ){
    navLinks.style.right = '0';
  } else {
    navLinks.style.right = '-300px';
  }
};
barToggle.addEventListener('click', toggleBar);
navClose.addEventListener('click', toggleBar)

// Modal window

const openModal = function(e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


// Menu fade animation

const handleHover = function(e) {
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    
    siblings.forEach(el => {
      if(el !== link) el.style.opacity = this;
    });
    
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5)); 

nav.addEventListener('mouseout', handleHover.bind(1));


// -- Sticky navigation

const navHeight = nav.getBoundingClientRect().height;


const stickyNav = function (entries) {
  const [entry] = entries;
  
  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});
headerObserver.observe(header);
