/*LOADING ANIMATION*/

if (document.querySelector('.spinner-wrapper')) {
    let spinnerWrapper = document.querySelector('.spinner-wrapper');

    window.addEventListener('load', function () {
        // spinnerWrapper.style.display = 'none';
        spinnerWrapper.parentElement.removeChild(spinnerWrapper);
    });
}

/* Filter Opened */

const filter = document.getElementById("filter-button") ? document.getElementById("filter-button") : undefined;


if (filter) {
    const filterOptions = (productList) => {

        let productsArray = [];
        if (document.getElementById("picadas-key")) {
            productsArray = productList.filter((p) => p.category == "picadas");
        } else if (document.getElementById("canastas-key")) {
            productsArray = productList.filter((p) => p.category == "cajas");
        }

        if (filter.value == "menorAMayor") {
            if (!itemContainer.hasChildNodes()) {
                displayCheaperFirst(productsArray);
            } else {
                while (itemContainer.firstChild) {
                    itemContainer.removeChild(itemContainer.firstChild);
                }
                displayCheaperFirst(productsArray);
            }
        }

        if (filter.value == "mayorAMenor") {
            if (!itemContainer.hasChildNodes()) {
                displayExpensiveFirst(productsArray);
            } else {
                while (itemContainer.firstChild) {
                    itemContainer.removeChild(itemContainer.firstChild);
                }
                displayExpensiveFirst(productsArray);
            }
        }

        if (filter.value == "masVendidos" && document.getElementById("picadas-key")) {
            if (!itemContainer.hasChildNodes()) {
                displayPicadas(productList);
            } else {
                while (itemContainer.firstChild) {
                    itemContainer.removeChild(itemContainer.firstChild);
                }
                displayPicadas(productList);
            }
        }

        if (filter.value == "masVendidos" && document.getElementById("canastas-key")) {
            if (!itemContainer.hasChildNodes()) {
                displayCanastas(productList);
            } else {
                while (itemContainer.firstChild) {
                    itemContainer.removeChild(itemContainer.firstChild);
                }
                displayCanastas(productList);
            }
        }

        if (filter.value == "chicas") {
            if (!itemContainer.hasChildNodes()) {
                displayPicadasChicas(productsArray);
            } else {
                while (itemContainer.firstChild) {
                    itemContainer.removeChild(itemContainer.firstChild);
                }
                displayPicadasChicas(productsArray);
            }

        }

        if (filter.value == "grandes") {
            if (!itemContainer.hasChildNodes()) {
                displayPicadasGrandes(productsArray);
            } else {
                while (itemContainer.firstChild) {
                    itemContainer.removeChild(itemContainer.firstChild);
                }
                displayPicadasGrandes(productsArray);
            }
        }

    }

    /**DISPLAY PICADAS**/

    function displayPicadas(productList) {

        let uList;

        if (!document.querySelector('.shop__products')) {
            uList = document.createElement('ul');
            uList.className = 'shop__products';
        } else {
            uList = document.querySelector('.shop__products');
        }

        let picadasArray = productList.filter((p) => p.category == "picadas");

        let picadasHTML = '';

        picadasArray.forEach((picada) => {
            picadasHTML +=
                `
            <li class="shop__product__item" data-id=${picada.id}>
          <img id="item-image" class="item__image" src="./img/${picada.image}" alt="${picada.title}"></p>
            <a id="addToCart" class="addToCart"><i id="add-icon" class="fas fa-shopping-bag"></i></a>
            <p class="item__title">${picada.title}</p>
            <p class="item__price">$${picada.price}</p>
   </li>
                `
        })

        uList.innerHTML = picadasHTML;
        itemContainer.append(uList);
    }

    /*DISPLAY CANASTAS */

    function displayCanastas(productList) {

        if (!document.querySelector('.shop__products')) {
            uList = document.createElement('ul');
            uList.className = 'shop__products';
        } else {
            uList = document.querySelector('.shop__products');
        }

        let canastasArray = productList.filter((canasta) => canasta.category == "cajas");

        let canastasHTML = '';

        canastasArray.forEach((canasta) => {

            canastasHTML +=
                `
                <li class="shop__product__item" data-id=${canasta.id}>
                <img id="item-image" class="item__image" src="./img/${canasta.image}" alt="${canasta.title}"></p>
                  <a id="addToCart" class="addToCart"><i id="add-icon" class="fas fa-shopping-bag"></i></a>
                  <p class="item__title">${canasta.title}</p>
                  <p class="item__price">$${canasta.price}</p>
   </li>
                `
        })

        uList.innerHTML = canastasHTML;
        itemContainer.append(uList);
    }

    /*DISPLAY GIFTCARDS*/

    function displayGiftcards(productList) {

        if (!document.querySelector('.shop__products')) {
            uList = document.createElement('ul');
            uList.className = 'shop__products';
        } else {
            uList = document.querySelector('.shop__products');
        }

        let giftcardsArray = productList.filter((giftcard) => giftcard.category == "giftcard");

        let giftcardHTML = '';

        giftcardsArray.forEach((giftcard) => {

            giftcardHTML +=
                `
                <li class="shop__product__item" data-id=${giftcard.id}>
                <img id="item-image" class="item__image" src="./img/${giftcard.image}" alt="${giftcard.title}"></p>
                  <a id="addToCart" class="addToCart"><i id="add-icon" class="fas fa-shopping-bag"></i></a>
                  <p class="item__title">${giftcard.title}</p>
                  <p class="item__price">$${giftcard.price}</p>
   </li>
                `
        })

        uList.innerHTML = giftcardHTML;
        itemContainer.append(uList);
    }

    /*DISPLAY IMPORTADOS*/

    function displayImportados(productList) {

        if (!document.querySelector('.shop__products')) {
            uList = document.createElement('ul');
            uList.className = 'shop__products';
        } else {
            uList = document.querySelector('.shop__products');
        }

        let importadosArray = productList.filter((importado) => importado.category == "importados");

        let importadosHTML = '';

        importadosArray.forEach((importado) => {

            importadosHTML +=
                `
                <li class="shop__product__item" data-id=${importado.id}>
                <img id="item-image" class="item__image" src="./img/${importado.image}" alt="${importado.title}"></p>
                  <a id="addToCart" class="addToCart"><i id="add-icon" class="fas fa-shopping-bag"></i></a>
                  <p class="item__title">${importado.title}</p>
                  <p class="item__price">$${importado.price}</p>
   </li>
                `
        })

        uList.innerHTML = importadosHTML;
        itemContainer.append(uList);
    }

        /*DISPLAY QATAR PROMOS*/

        function displayQatar(productList) {

            if (!document.querySelector('.shop__products')) {
                uList = document.createElement('ul');
                uList.className = 'shop__products';
            } else {
                uList = document.querySelector('.shop__products');
            }
    
            let qatarArray = productList.filter((qatar) => qatar.category == "qatar");
    
            let qatarHTML = '';
    
            qatarArray.forEach((qatar) => {
    
                qatarHTML +=
                    `
                    <li class="shop__product__item" data-id=${qatar.id}>
                    <img id="item-image" class="item__image" src="./img/${qatar.image}" alt="${qatar.title}"></p>
                      <a id="addToCart" class="addToCart"><i id="add-icon" class="fas fa-shopping-bag"></i></a>
                      <p class="item__title">${qatar.title}</p>
                      <p class="item__price">$${qatar.price}</p>
       </li>
                    `
            })
    
            uList.innerHTML = qatarHTML;
            itemContainer.append(uList);
        }

    /* MAS BARATO PRIMERO */

    const displayCheaperFirst = (productList) => {

        let uList = document.createElement('ul');
        uList.className = 'shop__products';


        let filteredItems = productList.sort((a, b) => a.price - b.price)

        let filterHTML = '';

        filteredItems.forEach((item) => {

            filterHTML +=
                `
                <li class="shop__product__item" data-id=${item.id}>
                <img id="item-image" class="item__image" src="./img/${item.image}" alt="${item.title}"></p>
                  <a id="addToCart" class="addToCart"><i id="add-icon" class="fas fa-shopping-bag"></i></a>
                  <p class="item__title">${item.title}</p>
                  <p class="item__price">$${item.price}</p>
   </li>
                `
        })

        uList.innerHTML = filterHTML;
        itemContainer.append(uList);
    }

    /* MAS CARO PRIMERO */

    const displayExpensiveFirst = (productList) => {
        let uList = document.createElement('ul');
        uList.className = 'shop__products';


        let filteredItems = productList.sort((b, a) => a.price - b.price)

        let filterHTML = '';

        filteredItems.forEach((item) => {

            filterHTML +=
                `
                <li class="shop__product__item" data-id=${item.id}>
                <img id="item-image" class="item__image" src="./img/${item.image}" alt="${item.title}"></p>
                  <a id="addToCart" class="addToCart"><i id="add-icon" class="fas fa-shopping-bag"></i></a>
                  <p class="item__title">${item.title}</p>
                  <p class="item__price">$${item.price}</p>
   </li>
                `
        })

        uList.innerHTML = filterHTML;
        itemContainer.append(uList);
    }

    /* DISPLAY PICADAS CHICAS */

    const displayPicadasChicas = () => {
        let uList = document.createElement('ul');
        uList.className = 'shop__products';


        let filteredItems = productList.filter((p) => p.subcategory === "chica");

        let filterHTML = '';

        filteredItems.forEach((item) => {

            filterHTML +=
                `
                <li class="shop__product__item" data-id=${item.id}>
                <img id="item-image" class="item__image" src="./img/${item.image}" alt="${item.title}"></p>
                  <a id="addToCart" class="addToCart"><i id="add-icon" class="fas fa-shopping-bag"></i></a>
                  <p class="item__title">${item.title}</p>
                  <p class="item__price">$${item.price}</p>
   </li>
                `
        })

        uList.innerHTML = filterHTML;
        itemContainer.append(uList);
    }

    /* DISPLAY PICADAS GRANDES */

    const displayPicadasGrandes = () => {
        let uList = document.createElement('ul');
        uList.className = 'shop__products';


        let filteredItems = productList.filter((p) => p.subcategory === "grande");

        let filterHTML = '';

        filteredItems.forEach((item) => {

            filterHTML +=
                `
                <li class="shop__product__item" data-id=${item.id}>
                <img id="item-image" class="item__image" src="./img/${item.image}" alt="${item.title}"></p>
                  <a id="addToCart" class="addToCart"><i id="add-icon" class="fas fa-shopping-bag"></i></a>
                  <p class="item__title">${item.title}</p>
                  <p class="item__price">$${item.price}</p>
   </li>
                `
        })

        uList.innerHTML = filterHTML;
        itemContainer.append(uList);
    }

    filter.addEventListener("change", async () => {
        await fetchProducts();
        filterOptions(productList)
    })
}

/* POPUP APPEARS */

const toggleDetails = (event) => {

    const popup = document.getElementById('popup');
    popup.classList.toggle('active');

    const btnClosePopup = document.getElementById('btn-close-popup');
    btnClosePopup.addEventListener('click', () => {
        popup.classList.remove('active');
    })

    const productClickedTitle = event.target.alt;
    const productDescriptionTitleDiv = document.querySelector('.product__title__description');
    const productDescriptionTamañoDiv = document.querySelector('.contenido__description');
    const productDescriptionFiambresDiv = document.querySelector('.fiambres__description');
    const productDescriptionQuesosDiv = document.querySelector('.quesos__description');

    const productDescriptionContent = productList.find((p) => p.title === productClickedTitle);

    productDescriptionTitleDiv.textContent = productDescriptionContent.title;
    productDescriptionTamañoDiv.textContent = productDescriptionContent.description;
    if (productDescriptionFiambresDiv && productDescriptionQuesosDiv) {
        productDescriptionFiambresDiv.textContent = productDescriptionContent.fiambres;
        productDescriptionQuesosDiv.textContent = productDescriptionContent.quesos;
    }
}

/* Overlay Functions */

const overlayId = document.getElementById("overlay");

const activeOverlay = () => {
    overlayId.classList.add('overlay');
}

const disableOverlay = () => {
    overlayId.classList.remove('overlay');
}

/**CLICK ACTIONS**/


const itemContainer = document.querySelector('.item__container');


document.addEventListener('click', (event) => {
    if (event.target && event.target.className.includes('addToCart') || event.target && event.target.id.includes('add-icon')) {
        addToCartClicked(event);
        showShoppingCart();
    }
})

document.addEventListener('click', (event) => {
    if (event.target && event.target.className.includes('item__image') || event.target && event.target.id.includes('item-image')) {
        toggleDetails(event)
    }
})

document.getElementById('shoppingBag').addEventListener("click", () => {
    showShoppingCart();
})

document.addEventListener("click", (event) => {
    if (event.target && event.target.className.includes('overlay')) {
        closeShoppingCart();
    }
})

document.querySelectorAll('.back__to__shop').forEach(e =>
    e.addEventListener("click", () => {
        closeShoppingCart();
    }));


/* SHOPPING CART SHOW */

const shoppingCartOpened = document.getElementById("shoppingCart");

const showShoppingCart = () => {

    shoppingCartOpened.classList.add("shopping-cart-active");
    removeEmptyCartMessage();
    activeOverlay();

};

const closeShoppingCart = () => {

    shoppingCartOpened.classList.remove("shopping-cart-active");
    disableOverlay();

}

const removeEmptyCartMessage = () => {
    if (order.items.length) {
        shoppingCartItemsContainer.querySelector(".empty__cart__text").innerHTML = "";
    }
}

const showEmptyCartMessage = () => {
    if (order.items.length < 1) {
        shoppingCartItemsContainer.querySelector(".empty__cart__text").innerHTML = "Todavía no tenes productos en el carrito";
    }
}

const checkComprarButton = () => {
    if (order.items.length) {
        comprarButtonEnabled();
    } else {
        comprarButtonDisabled();
    }
}


const comprarButtonDisabled = () => {
    const comprarButton = document.querySelector('.comprarButton');
    console.log("disabled")
    comprarButton.href = "#";
    comprarButton.className = "btn btn-secondary-disabled ml-auto comprarButton";
}

const comprarButtonEnabled = () => {
    const comprarButton = document.querySelector('.comprarButton');
    console.log("enabled")
    comprarButton.href = "./checkout.html"
    comprarButton.className = "btn btn-secondary ml-auto comprarButton"
}

/*MOVING ITEMS TO SHOPPING CART*/

const shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer');


function addToCartClicked(event) {
    const button = event.target;
    const item = button.closest('.shop__product__item');

    const itemTitle = item.querySelector('.item__title').textContent;
    const itemPrice = item.querySelector('.item__price').textContent;
    const itemImage = item.querySelector('.item__image').src;
    const itemQuantity = 1;
    const itemId = Number(item.dataset.id);

    addItemToShoppingCart(itemTitle, itemPrice, itemImage, itemQuantity, itemId);

}


let productList = [];


let order = {
    items: [],
};

/**SAVE SHOPPING CART TO LOCAL STORAGE**/
function saveToLocalStorage() {
    localStorage.setItem('order', JSON.stringify(order))
}

/**CHANGE BAG NUMBER**/
function changeBagNumber() {
    let orderLength = order.items.length;
    const shoppingBag = document.getElementById("shoppingBag");
    let shoppingBagNumber = document.getElementById("shoppingBagNumber");

    if (shoppingBag.style.display = "none") {
        shoppingBagNumber.style.display = "block";
    }

    shoppingBagNumber.innerHTML = orderLength;
}

function addToCartFromQuantity(itemId, event) {

    const orderLength = order.items.length;

    let filteredOrder = order.items.filter((item) => item.id !== itemId);

    order.items = filteredOrder;

    let shoppingCartItemQuantity = event.target.closest('.shoppingCartItemQuantity').value;

    if (shoppingCartItemQuantity >= 1) {

        for (i = 0; i < shoppingCartItemQuantity; i++) {
            order.items.push(productList.find((e) => e.id === itemId));
        }
    }

    saveToLocalStorage();
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage, itemQuantity, itemId) {

    order.items.push(productList.find((p) => p.id === itemId));

    removeEmptyCartMessage();
    checkComprarButton();

    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
        'shoppingCartItemTitle'
    );

    for (let i = 0; i < elementsTitle.length; i++) {
        if (elementsTitle[i].innerText === itemTitle) {
            let elementQuantity = elementsTitle[
                i
            ].parentElement.parentElement.parentElement.querySelector(
                '.shoppingCartItemQuantity'
            );

            elementQuantity.value++;
            saveToLocalStorage();
            updateShoppingCartTotal();
            changeBagNumber();
            return;
        }
    }


    const shoppingCartRow = document.createElement('div');
    const shoppingCartContent = `
    <div class="row shoppingCartItem" data-id=${itemId}>
          
        <div class="the__item shopping-cart-item h-100">
        <div class="shopping-cart-left">
            <img src=${itemImage} class="shopping-cart-image">
                <div class="item__text">   
                    <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
                    <div class="qtyField">
                  <div>
                    <label style="color: rgba(0, 0, 0, 0.596);" for="shoppingCartItemQuantity">Cantidad<label>
                  </div>   
                    <div class="qty">
                        <input onChange="addToCartFromQuantity(${itemId}, event)" id="shopping-cart-quantity-buttons" type="number" class="shoppingCartItemQuantity" name="qty" value="1">
                    </div>
                  </div>
                  </div>
                </div>
                  
                  <p class="sc__price shoppingCartItemPrice">${itemPrice}</p>
                  <button class="buttonDelete" type="button">X</button>      
        </div>                    
        </div>`;
    shoppingCartRow.innerHTML = shoppingCartContent;
    shoppingCartItemsContainer.append(shoppingCartRow);

    shoppingCartRow
        .querySelector(".buttonDelete")
        .addEventListener('click', removeShoppingCartItem);

    shoppingCartRow
        .querySelector('.shoppingCartItemQuantity').
        addEventListener('change', quantityChanged);

    saveToLocalStorage();
    updateShoppingCartTotal();
    changeBagNumber();
    console.log(elementsTitle[0])
}

function updateShoppingCartTotal() {
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

    shoppingCartItems.forEach((shoppingCartItem) => {
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
            '.shoppingCartItemPrice'
        );
        const shoppingCartItemPrice = Number(
            shoppingCartItemPriceElement.textContent.replace('$', '')
        );
        const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
            '.shoppingCartItemQuantity'
        );
        const shoppingCartItemQuantity = Number(
            shoppingCartItemQuantityElement.value
        );
        total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    });
    shoppingCartTotal.innerHTML = `$${total.toFixed(2)}`;
}

function removeShoppingCartItem(event) {
    const buttonClicked = event.target;
    const itemDeletedId = buttonClicked.parentElement.parentElement.dataset.id;
    const filteredItems = order.items.filter((item) => item.id != itemDeletedId);
    order.items = filteredItems;
    buttonClicked.closest('.shoppingCartItem').remove();
    updateShoppingCartTotal();
    saveToLocalStorage();
    changeBagNumber();
    showEmptyCartMessage();
    checkComprarButton();
}

function quantityChanged(event) {
    const input = event.target;
    input.value <= 0 ? (input.value = 1) : null;
    updateShoppingCartTotal();
    changeBagNumber();
}

/* Paint Shopping Cart */

function paintShoppingCart() {
 
    order.items.forEach((item) => {

        const shoppingCartRow = document.createElement('div');
        const shoppingCartContent = `
        <div class="row shoppingCartItem" data-id=${item.id}>
            
            <div class="the__item shopping-cart-item h-100">
            <div class="shopping-cart-left">
                <img src="../img/${item.image}" class="shopping-cart-image">
                    <div class="item__text">   
                        <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${item.title}</h6>
                        <div class="qtyField">
                    <div>
                        <label style="color: rgba(0, 0, 0, 0.596);" for="shoppingCartItemQuantity">Cantidad<label>
                    </div>   
                        <div class="qty">
                            <input onChange="addToCartFromQuantity(${item.id}, event)" id="shopping-cart-quantity-buttons" type="number" class="shoppingCartItemQuantity" name="qty" value="1">
                        </div>
                    </div>
                    </div>
                    </div>
                    
                    <p class="sc__price shoppingCartItemPrice">$${item.price}</p>
                    <button class="buttonDelete" type="button">X</button>      
            </div>                    
            </div>`;
        shoppingCartRow.innerHTML = shoppingCartContent;
        shoppingCartItemsContainer.append(shoppingCartRow);

        shoppingCartRow
            .querySelector(".buttonDelete")
            .addEventListener('click', removeShoppingCartItem);

        shoppingCartRow
            .querySelector('.shoppingCartItemQuantity').
            addEventListener('change', quantityChanged);


        updateShoppingCartTotal();
        changeBagNumber();
    })
};


