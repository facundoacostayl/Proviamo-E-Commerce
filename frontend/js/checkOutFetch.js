function displayShoppingCartProducts() {
    const shoppingCartProductContainer = document.querySelector('.shoppingCartItemCheckout');


    const shoppingCartFinalContent = order.items.map((item) =>

        `

    <div class="item">
    <div class="item-left">
      <div class="d-flex">
        <img src="./img/${item.image}" class="shopping-cart-image">
        <div class="shopping-cart-item align-items-center h-100 pb-4 pt-1">
  
          <h6 class="shopping-cart-item-title shoppingCartItemTitle ml-3 mb-1">${item.title}</h6>
  
          <div class="d-flex">
            <label style="color: rgba(0, 0, 0, 0.596);" for="shoppingCartItemQuantity">Cantidad<label>
                <div>
                  <input type="number" class="checkoutShoppingCartItemQuantity" name="qty" value="1">
                </div>
          </div>
        </div>
      </div>
      </div>
    <div class="item-right">
      <p class="sc__price shoppingCartItemPrice">$${item.price}</p>
    </div>
  </div>
  `
    )

    shoppingCartProductContainer.innerHTML = shoppingCartFinalContent;
}

let cont = 0;

const displaySubTotal = async () => {
    totalMap = order.items.map((i) => {
        cont = cont + i.price;
    })

    const totalContainer = document.querySelector('.shopping-cart-subtotal-checkout');
    const finalTotal = document.createElement('p');
    let finalTotalContent = "$" + cont;

    finalTotal.innerHTML = finalTotalContent;
    totalContainer.append(finalTotal);
}

const shippingCheckbox = document.getElementById("shipping-confirm");
cont = cont;
const shippingDriveProduct = 
{
    id: 20,
    title: "Envio",
    price: 550
}

const displayTotal = async () => {

    const totalContainer = document.querySelector('.shopping-cart-total-checkout');
    const finalTotal = document.createElement('p');
    finalTotal.classList = "finalTotal";
    let finalTotalContent = "$" + cont;

    finalTotal.innerHTML = finalTotalContent;
    totalContainer.append(finalTotal);
}

const displayTotalWithShipping = async () => {

    order.items.push(shippingDriveProduct)
    console.log(order.items)


    let finalCont = await (await cont + 550);

    document.querySelector(".finalTotal").innerHTML = "$" + finalCont;    

}

const removeEnvioFromCart = () => {
    order.items.pop();
    document.querySelector(".finalTotal").innerHTML = "$" + cont;
    console.log(order.items)
}

shippingCheckbox.addEventListener("change", () => {
    if (shippingCheckbox.checked) {
        displayTotalWithShipping()
        radio2.checked = true;
        if(radio1.checked){
            radio1.checked = false;
        }
        let checkedContent = `
        <div class="col-12">
        <label class="order-form-label">Dirección<span class="form__check"> *</span></label>
        </div>
        <div class="col-12">
        <input id="calle" class="order-form-input" placeholder="Calle y número de domicilio">
        </div>
        <div class="col-12 mt-2">
        <input id="entre-calles" class="order-form-input" placeholder="entre calles(opcional)">
        </div>
        <div class="col-12 col-sm-6 mt-2 pr-sm-2">
        <input id="barrio" class="order-form-input" placeholder="Ciudad / Barrio">
        </div>
        <div class="col-12 col-sm-6 mt-2 pr-sm-2">
        <input type="number" id="postal-code" class="order-form-input" placeholder="Código Postal">
        </div>
  `
        checkedDiv.innerHTML = checkedContent;
        formContainer.append(checkedDiv);
    }
    
    if (!shippingCheckbox.checked) {
       removeEnvioFromCart()
       radio2.checked = false;
       formContainer.removeChild(checkedDiv);
    }

    if(radio1.checked){
        removeEnvioFromCart();
    }
});

    const goToBuy = () => {

        const inputs = document.querySelectorAll("#formulario input");

    let form = document.getElementById("formulario"),
        form__phone = document.getElementById("telefono").value,
        form__correo = document.getElementById("email").value,
        shipping__radio__options = document.getElementsByName("shippingType"),
        sucursal__radio__options = document.getElementsByName("gridRadiosSucursal"),
        factura__button = document.getElementById("factura").checked,
        textareafield = document.getElementById("comentarios").value,
        danger__alert = document.getElementById("dangerAlert"),
        validation = document.getElementById("terms-validation"),
        errorFlag = false;

    let errorMessages = [];

    if (form__phone.length < 10) {
        errorMessages.push("Ingresa un número de teléfono válido");
        errorFlag = true;
    }

    let expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    let isValid = expReg.test(form__correo);

    if (isValid == false) {
        errorMessages.push("Ingresa una dirección de Email válida");
        errorFlag = true;
    }

    let shippingOption;

    if (shipping__radio__options[0].checked) {
        shippingOption = "Retira en sucursal";
    } else if (shipping__radio__options[1].checked) {
        shippingOption = "Envío a domicilio";
    } else {
        errorMessages.push("Selecciona un medio para recibir tu pedido");
        errorFlag = true;
    }

    let facturaOption;

    if(factura__button){
        facturaOption = "Solicita Factura A"
    }


    if (!validation.checked) {
        errorMessages.push("Debes leer y aceptar los Términos y Condiciones");
        errorFlag = true;
    }

    if(!document.getElementById('shipping-date').value) {
        errorMessages.push("Debes seleccionar una fecha de entrega");
        errorFlag = true;
    }


    danger__alert.innerHTML = errorMessages.join('<br>')

    if (errorFlag == true) {
        danger__alert.classList.remove("d-none");
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
        return false;
    } else {
        danger__alert.classList.add("d-none")
    }


    order.shipping = {
        name: document.getElementById("nombre").value,
        lastname: document.getElementById("apellido").value,
        phone: document.getElementById("telefono").value,
        email: document.getElementById("email").value,
        shippingType: shippingOption
    };


    if (shippingOption === "Envío a domicilio") {
        order.shipping.addresLine = document.getElementById("calle").value;
        order.shipping.addresLine = document.getElementById("entre-calles").value;
        order.shipping.city = document.getElementById("barrio").value;
        order.shipping.postalCode = document.getElementById("postal-code").value;
        order.shipping.date = document.getElementById('shipping-date').value;
    } else if (shippingOption == "Retira en sucursal") {
        order.shipping.date = document.getElementById('shipping-date').value;
        sucursal__radio__options.forEach((o) => {
            if (o.checked) {
                order.shipping.sucursal = o.value;
            }
        })
    }

    if(facturaOption === "Solicita Factura A") {
        order.shipping.razonSocial = document.getElementById("razonSocial").value;
        order.shipping.cuit = document.getElementById("cuit").value;
    }

    if(textareafield){
        order.shipping.comentarios = textareafield;
    }


        const checkoutContainer = document.querySelector('.e-shop-checkout');

        let finalProductList = '';

        order.items.map((p) => {
            finalProductList = finalProductList + 
            `
            <li><p>${p.title}<span class="confirm__quantity">x1</span></p><span class="confirm__price">$${p.price}</span></li>
            `
        })

        console.log(finalProductList);

        checkoutContainer.innerHTML = `
        <div class="confirm__field">
        <h2>Ya podés confirmar tu compra</h2>
        <div class="confirm__products">
          <p>Tus productos:</p>
          <div class="final__products">
            <ul>
                ${finalProductList}
            </ul>
          </div>
        </div>
        <div class="row total__products">
          <h3>Total:</h3>
          <p>$${cont}</p>
        </div>
        <div class="row mt-3">
          <div class="col-12">
            <button id="button-checkout" type="button"
              class="btn-comprar d-block mx-auto button-checkout" disabled>COMPRAR</button>
          </div>
        </div>
      </div>
      `  ;

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })

      pay();
    }

    async function pay(){
   
    
    /*const expresiones = {
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    }*/

    try {
        const preference = await(await fetch("/api/orders", {
            method: "post",
            body: JSON.stringify(order),
            headers: {
                "Content-Type": "application/json"
            }
        })).json()
        .catch(rejected => {
            console.log(rejected)
        })

        var script = document.createElement("script");

        // The source domain must be completed according to the site for which you are integrating.
        // For example: for Argentina ".com.ar" or for Brazil ".com.br".
        script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
        script.type = "text/javascript";
        script.dataset.preferenceId = preference.preferenceId;
        document.getElementById("button-checkout").innerHTML = "";
        document.querySelector("#button-checkout").appendChild(script);
    }
    catch (e) {
        console.log("Error" + e.toString())
    }
}

const getFromLocalStorage = async () => {
    if (localStorage.getItem('order')) {
        order = await JSON.parse(localStorage.getItem('order'))
    }
}

window.onload = async () => {
    getFromLocalStorage();

    productList = await (await fetch("/api/products")).json();
    console.log(order)

    displayShoppingCartProducts();
    displaySubTotal();
    displayTotal();
    console.log(JSON.stringify(order));
}


