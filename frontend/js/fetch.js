/* Fetch Functions */

async function fetchProducts() {
    productList = await (await fetch("/api/products")).json();
    if (document.querySelector('.shoppingCartItemsContainer')) {
        optionsToDisplay(productList);
    }
}

const optionsToDisplay = (productList) => {
    if (document.getElementById("picadas-key")) {
        const picadasKey = document.getElementById("picadas-key");
        if (picadasKey.innerHTML.includes("Nuestras Picadas"))
            displayPicadas(productList);
        return;
    }
    if (document.getElementById("full-key")) {
        const fullKey = document.getElementById("full-key");
        if (fullKey.innerHTML.includes("Todos los productos"))
            displayProducts(productList);
        return;
    }
    if (document.getElementById("canastas-key")) {
        const canastasKey = document.getElementById("canastas-key");
        if (canastasKey.innerHTML.includes("Cajas y Canastas"))
            displayCanastas(productList);
        return;
    }
}


/*let request = async () => {
    if (document.getElementById("product-description")) {
        try {

            let descriptionId = document.getElementById("product-description");
            let detailsImage = document.getElementById("details-image");
            let detailsTitle = document.getElementById("details-title");
            let detailsPrice = document.getElementById("details-price");
            let detailsDescription = document.getElementById("details-description");


            const response = await fetch('http://localhost:3000/api/details');
            const details = await response.json();
            console.log(details)
            let idFound = productList.find((p) => p.title === details.title)
            descriptionId.dataset.id = idFound.id;
            detailsImage.src = "/img" + "/" + details.image;
            detailsTitle.textContent = details.title;
            detailsPrice.textContent = "$" + details.price;
            detailsDescription.textContent = details.description;
        } catch (e) {
            console.log("Error" + e.toString())
        }
    }
}*/


window.onload = async () => {
    await fetchProducts();
    //await request()
    if (localStorage.getItem('order')) {
        order = await JSON.parse(localStorage.getItem('order'))
        removeEmptyCartMessage();
        checkComprarButton();
        paintShoppingCart();
    }
}