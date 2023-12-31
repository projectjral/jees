'use strict';

const modal = document.querySelector('.modal');
const catg = document.querySelector('.event__catg');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 =  document.getElementById('section--1');
const nav = document.querySelector('.nav');
const catgLink = document.querySelector('.catg__link');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const barToggle = document.getElementById('bar');
const navLinks = document.querySelector('.nav__links');
const navClose = document.querySelector('.nav--close');
///////////////////////////////////////


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

////// TEST

// CART




///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
// Get references to the sidebar menus and product container
const menuButtons = document.querySelectorAll('#sidebar .toggleButton');
const menus = document.querySelectorAll('#sidebar ul');
const productContainer = document.getElementById('productContainer');

// Add click event listeners to each sidebar menu button
menuButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedMenuId = button.dataset.target;
    const selectedMenu = document.getElementById(selectedMenuId);

    // Hide all menus except the selected one
    menus.forEach(menu => {
      if (menu !== selectedMenu) {
        menu.classList.add('collapsed');
      }
    });

    // Toggle the 'collapsed' class on the selected menu
    selectedMenu.classList.toggle('collapsed');

    // Update the plus/minus sign for all buttons
    menuButtons.forEach(btn => {
      const spanElement = btn.querySelector('span');
      if (btn === button) {
        if (selectedMenu.classList.contains('collapsed')) {
          spanElement.textContent = '+';
        } else {
          spanElement.textContent = '-';
        }
      } else {
        spanElement.textContent = '+';
      }
    });

    // Filter and display the corresponding products
    const products = document.querySelectorAll('.pro');
    products.forEach(product => {
      const productMenu = product.classList[1];
      if (productMenu === selectedMenuId) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  });
});

// Add click event listeners to each list item
const listItems = document.querySelectorAll('#sidebar ul li[data-target]');
listItems.forEach(listItem => {
  listItem.addEventListener('click', () => {
    const targetProductId = listItem.dataset.target;
    const targetProducts = document.querySelectorAll(`[data-product="${targetProductId}"]`);
    const products = document.querySelectorAll('.pro');
    
    // Hide all products
    products.forEach(product => {
      product.style.display = 'none';
    });

    // Show only the target products
    targetProducts.forEach(product => {
      product.style.display = 'block';
    });
  });
});




/////////
/////////-- SEARCH BUTTON

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Add event listener to the search button
searchButton.addEventListener('click', searchProducts);

// Function to search products based on the input value
function searchProducts() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  // Get all the product elements
  const products = document.querySelectorAll('.pro');

  // Iterate over each product and check if it matches the search term
  products.forEach(product => {
    const productName = product.querySelector('.desc span').textContent.toLowerCase();

    // Show/hide the product based on the search term match
    if (productName.includes(searchTerm)) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}

// Add event listener to reset the search
searchInput.addEventListener('input', searchProducts);



///////////////////////////////////////////////////////
//////////////////////////////////////////////////////


// Get references to the filter options
const categoryFilter = document.getElementById('category');
const priceFilter = document.getElementById('price');

// Add event listeners to the filter options
categoryFilter.addEventListener('change', filterProducts);
priceFilter.addEventListener('change', filterProducts);

// Function to filter the products based on the selected options
function filterProducts() {
  const selectedCategory = categoryFilter.value;
  const selectedPrice = priceFilter.value;

  // Get all the product elements
  const products = document.querySelectorAll('.pro');

  // Iterate over each product and apply the filter
  products.forEach(product => {
    const productCategory = product.getAttribute('data-category');
    const productPrice = parseInt(product.getAttribute('data-price'));

    // Check if the product matches the selected category and price range
    const categoryMatch = selectedCategory === '' || selectedCategory === productCategory;
    const priceMatch = selectedPrice === '' || isPriceInRange(productPrice, selectedPrice);

    // Show/hide the product based on the filter
    product.style.display = categoryMatch && priceMatch ? 'block' : 'none';
  });
}

// Function to check if a price falls within a given range
function isPriceInRange(price, range) {
  const [min, max] = range.split('-').map(parseFloat);
  return price >= min && price <= max;
}




//////////////////////////////////////////////////////
/////////////////////////////////////////////////////



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

// Event category window
//
const openCatg = function(e) {
  e.preventDefault();
  catg.classList.remove('hidden');
  
}
const closeCatg = function() {
  catg.classList.add('hidden');
};

catgLink.addEventListener('mouseover', openCatg);
catgLink.addEventListener('mouseout', closeCatg);
catg.addEventListener('mouseover', openCatg);
catg.addEventListener('mouseout', closeCatg);
/////////////////////////////////////////////


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






///////////////////////////////////////////////////////////////////
// Tabbed component
  tabsContainer.addEventListener('click', function(e) {
    const clicked = e.target.closest('.operations__tab');
    console.log(clicked);
  

  // Guard clause
    if(!clicked) return;

  // Remove active classes
    tabs.forEach(t => t.classList.remove('operations__tab--active'));

    tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  // Activate tab
    clicked.classList.add('operations__tab--active');
  
  // Activate content area
  // console.log(clicked.dataset.tab);
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

});




// // Sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll', function() {
//   console.log(window.scrollY);

//   if(window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });


// // Sticky navigation: Intersection Observer API

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: 0.1,
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);

// observer.observe(section1);



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

// Reveal sections

const revealSection = function(entries, observer) {
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden'); 
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});


// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  // Guard clause
  if(!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: `200px`,
});

imgTargets.forEach(img => imgObserver.observe(img));


// Slider

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let curSlide = 0;
const maxSlide = slides.length;

// slider.style.transform = 'scale(0.4) translateX(-800px)';
// slider.style.overflow = 'visible';

const goToSlide = function (slide) {
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`));
}

goToSlide(0);

const nextSlide = function(){
  if(curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  };
  goToSlide(curSlide)
};

const prevSlide = function(){
  if(curSlide === 0) {
    curSlide = maxSlide -1;
  } else {
    curSlide--;
  };
  goToSlide(curSlide)
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function(e) {
  if(e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

////////////////////////////////////////////////////
///////////////////////////////////////////////////
//////////////////////////////////////////////////

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));



// //////////////// Event Listener mouseenter
// const h1 = document.querySelector('h1');

// // h1.addEventListener('mouseenter', function (e){
// //   alert('You are hovering');
// // });

// // h1.onmouseenter = function (e){
// // alert('You are hovering')};

// const alertH1 = function(e) {
//   alert('You are hovering!');

//   // h1.removeEventListener('mouseenter', alertH1);
// };

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
// h1.addEventListener('mouseenter', alertH1);

// ////////////// Bubbling explained

// // rgb(255,255,255)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function(e) { 
//   this.style.backgroundColor = randomColor();
//   console.log('Link', e.target, e.currentTarget);

//   console.log(e.target === this);

//   // Stop propagation - to stop bubbling or not to involve parents
//   e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function(e) { 
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
//  });

//  document.querySelector('.nav').addEventListener('click', function(e) { 
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', e.target, e.currentTarget);
//  });
 

// ////////////// DOM TRAVERSING 

// const h1 = document.querySelector('h1');

// // Going downwards: child 
// console.log(h1.querySelector('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// // Going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// h1.closest('h1').style.background = 'var(--gradient-primary)';

// // Going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);

// [...h1.parentElement.children].forEach(function (el) {
//   if(el !== h1) el.style.transform = 'scale(0.5)';
// });