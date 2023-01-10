/* MENU SHOW */

const overlay = document.getElementById("menu-overlay");

const activeMenuOverlay = () => {
  overlay.classList.add('overlay');
}

const disableMenuOverlay = () => {
  overlay.classList.remove('overlay');
}

const showMenu = (toggleID, menuID) => {
  const toggle = document.getElementById(toggleID),
    menu = document.getElementById(menuID);

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("show")
      activeMenuOverlay();
    })
  }
};

showMenu("nav-toggle", "nav-menu");

/* "Productos" Menu */

const productosOpenedList = document.querySelector('.nav__products__menu');
const productosOpenMenuButton = document.querySelector('.arrow__li');

productosOpenMenuButton.addEventListener('click', () => openProductosMenu())

const openProductosMenu = () => {
  productosOpenedList.classList.toggle('menu__active');
}

const closeProductosMenu = () => {
  if (productosOpenedList.classList.contains("menu__active")) {
    productosOpenedList.classList.remove("menu__active")
  }
}



/* Remove After Select an Option*/

const navLink = document.querySelectorAll(".nav__link"),
  menu = document.querySelector("#nav-menu");

const menuRemove = () => {
  menu.classList.remove("show");
  disableMenuOverlay();
  closeProductosMenu();
}

navLink.forEach(n => n.addEventListener("click", menuRemove));


/* Remove by Cross Click */

const crossIcon = document.getElementById("remove-menu");
crossIcon.addEventListener("click", menuRemove);

/* Remove by click Overlay */

document.addEventListener("click", (event) => {
  if (event.target && event.target.className.includes("overlay")) {
    menuRemove();
  }
})

/* Color Change */

window.onscroll = () => {
  if (document.getElementById("header")) {
    const nav = document.getElementById("header");
    if (this.scrollY >= 200) nav.classList.add("box__shadow"); else nav.classList.remove("box__shadow");
  }else if(document.getElementById("au-header")){
    const nav = document.getElementById("au-header");
    if (this.scrollY >= 100) nav.setAttribute("style", "display: none;"); else nav.setAttribute("style", "display: block;");
  }
}

/* Open Shopping Cart */

const navShop = document.querySelector(".nav__shop");
let shoppingCartFromNav = document.getElementById("shoppingCart");

navShop.addEventListener("click", () => {
  shoppingCartFromNav.classList.add("shopping-cart-active");
  activeOverlay();
})




/* Image Slider */

let slideImages = document.querySelectorAll('.image__item'),
  arrowLeft = document.querySelector('#arrow-left'),
  arrowRight = document.querySelector('#arrow-right'),
  current = 0;

const reset = () => {
  for (i = 0; i < slideImages.length; i++) {
    slideImages[i].style.display = "none";
  }
}

const startSlide = () => {
  reset();
  slideImages[0].style.display = "block";
  setTimeout(slideNow, 3000);
}

const slideNow = () => {
  reset();
  slideImages[1].style.display = "block";
  setTimeout(slideAgain, 3000)
}

const slideAgain = () => {
  reset();
  slideImages[2].style.display = "block";
  setTimeout(startSlide, 3000)
}

const consoleLogDos = () => {

}

const slideLeft = () => {
  reset();
  slideImages[current - 1].style.display = "block";
  current--;
}

const slideRight = () => {
  reset();
  slideImages[current].style.display = "block";
  current++;
}


arrowLeft.addEventListener("click", () => {
  if (current === 0) {
    current = slideImages.length;
  }
  slideLeft();
})

arrowRight.addEventListener("click", () => {
  if (current === slideImages.length) {
    current = 0;
  }
  slideRight();
})

startSlide();

/* Mini Shop */

/* const miniShopContainer = document.querySelector('.products');
 const miniShopList = document.createElement("ul");

 miniShopList.className = "product__list";

 const miniShopProductList = productList.filter((p) => p.id <= 4)



 let miniShopListContent = miniShopProductList.forEach((p) => {
   `
   <li class="shop__product__item" data-id=${p.id}>
                 <a class="image__link" href="#"><img class="item__image" src="./img/${p.image}" alt="producto"></a>
                 <a id="addToCart" class="addToCart"><i id="add-icon" class="fas fa-shopping-bag"></i></a>
                 <a class="item__title" href="#">${p.title}</a>
                 <p class="item__price">$${p.price}</p>
             </li>
              `
 })

 miniShopList.innerHTML = miniShopListContent;
 miniShopContainer.append(miniShopList);
 */


/* Show Wpp Alert */

let wppAlert = document.getElementById("wpp-alert"),
  wppLogo = document.getElementById("wpp-logo"),
  body = document.getElementById("body");


const showAlert = () => {
  wppAlert.style.display = "block";
}

const hideAlert = () => {
  wppAlert.style.display = "none";
}


wppLogo.addEventListener("mouseover", showAlert);
wppLogo.addEventListener("mouseleave", hideAlert);

/* SUCURSAL SLIDER */

const sucursalArrowLeft = document.getElementById('sucursal-arrow-left');
const sucursalArrowRight = document.getElementById('sucursal-arrow-right');
const sucursalContainer = document.querySelector('.slider');

const indicatorParent = document.querySelector('.control ul');
const indicators = document.querySelectorAll('.control li');

let index = 0;

indicators.forEach((indicator, i) => {
  indicator.addEventListener('click', () => {
    document.querySelector('.control .selected').classList.remove('selected');
    indicator.classList.add('selected');
    sucursalContainer.style.transform = 'translateX(' + (i) * -33.3 + '%)';
    index = i;
  });
});


sucursalArrowLeft.addEventListener('click', function () {
  index = (index > 0) ? index - 1 : 0;
  document.querySelector('.control .selected').classList.remove('selected');
  indicatorParent.children[index].classList.add('selected');
  sucursalContainer.style.transform = 'translateX(' + (index) * -33.3 + '%)';
});

sucursalArrowRight.addEventListener('click', function () {
  index = (index < 3 - 1) ? index + 1 : 0;
  document.querySelector('.control .selected').classList.remove('selected');
  indicatorParent.children[index].classList.add('selected');
  sucursalContainer.style.transform = 'translateX(' + (index) * -33.3 + '%)';
});

const autoSlideSucursal = () => {
  setTimeout(() => {
    index = (index < 3 - 1) ? index + 1 : 0;
    document.querySelector('.control .selected').classList.remove('selected');
    indicatorParent.children[index].classList.add('selected');
    sucursalContainer.style.transform = 'translateX(' + (index) * -33.3 + '%)';
  }, 3000);
}

document.addEventListener('DOMContentLoaded', autoSlideSucursal)





