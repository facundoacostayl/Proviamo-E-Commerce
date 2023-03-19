/* Fetch Functions */

async function fetchProducts() {
  const result = await (await fetch("/api/products")).json();
  productList = result.data;
  if (document.querySelector(".shoppingCartItemsContainer")) {
    optionsToDisplay(productList);
  }
}

/**DISPLAYING DATA ACCORD TO SECTION**/
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
  if (document.getElementById("giftcard-key")) {
    const giftcardKey = document.getElementById("giftcard-key");
    if (giftcardKey.innerHTML.includes("Giftcards"))
      displayGiftcards(productList);
    return;
  }
  if (document.getElementById("importados-key")) {
    const importadosKey = document.getElementById("importados-key");
    if (importadosKey.innerHTML.includes("Importados"))
      displayImportados(productList);
    return;
  }
  if (document.getElementById("qatar-key")) {
    const qatarKey = document.getElementById("qatar-key");
    if (qatarKey.innerHTML.includes("Qatar 2022")) displayQatar(productList);
    return;
  }
};

//**GETTING CART DATA FROM LOCALSTORAGE AND DISPLAYING IT**/
window.onload = async () => {
  await fetchProducts();
  if (localStorage.getItem("order")) {
    order = await JSON.parse(localStorage.getItem("order"));
    removeEmptyCartMessage();
    checkComprarButton();
    paintShoppingCart();
  }
};
