// Checked
const radio1 = document.querySelector('#sucursal');
const radio2 = document.querySelector('#domicilio');
let checkFirstSecond;
const facturaButton = document.querySelector('#factura');
const facturaForm = document.querySelector('.factura__form')


radio1.addEventListener('change', checked1)
radio2.addEventListener('change', checked2)
facturaButton.addEventListener('change', displayFactura);


const formContainer = document.querySelector('.checked__row');
let checkedDiv = document.createElement('div');
checkedDiv.classList = 'sucursal__options row mt-3';

function checked1() {

  if (radio2.checked) {
    shippingCheckbox.checked = false;
    removeEnvioFromCart();
  }
  if (!radio1.checked) {
    formContainer.removeChild(checkedDiv);
    return;
  } else if (radio2.checked) {
    radio2.checked = false;
  }

  checkFirstSecond = true;

  if (formContainer.firstElementChild) {
    formContainer.removeChild(checkedDiv);
  }

  if (!formContainer.firsElementChild) {
    let checkedForm = `
      

      <div class="col-12">
            <label class="order-form-label">Fecha de entrega en sucursal<span class="form__check"> *</span></label>
            </div>
            <div class="col-12 mb-2">
            <input id="shipping-date" class="form-control" type"datetime-local" placeholder="Selecciona una fecha">
            </div>

        <div class="form-check mb-2 form-check-shipping">
          <input class="form-check-input" type="radio" name="gridRadiosSucursal" id="867" value="Maipu 867">
          <label class="form-check-label" for="867" style="cursor: pointer;">
            Maipu 867 (Microcentro - Lun a Vie de 10:00 a 20:00 - Sab de 10:30 a 15:00)
          </label>
        </div>
        <div class="form-check mb-2 form-check-shipping">
          <input class="form-check-input" type="radio" name="gridRadiosSucursal" id="384" value="Maipu 384">
          <label class="form-check-label" for="384" style="cursor: pointer;">
           Maipu 384 (Microcentro - De 10:30 a 19:00)
          </label>
        </div>
        <div class="form-check form-check-shipping">
          <input class="form-check-input" type="radio" name="gridRadiosSucursal" id="araoz" value="Araoz">
          <label class="form-check-label" for="araoz" style="cursor: pointer;">
           Araoz 2797 (Microcentro - De 10:00 a 20:00 - Sab de 10:30 a 20:00)
          </label>
        </div>
      
  
    `;

    checkedDiv.innerHTML = checkedForm;
    formContainer.append(checkedDiv)
    enableDatePicker();
  }

}

function checked2() {

  if (radio2.checked) {
    shippingCheckbox.checked = true;
    displayTotalWithShipping();
  } else {
    shippingCheckbox.checked = false;
    removeEnvioFromCart();
    console.log(order.items)
  }

  if (!radio2.checked) {
    formContainer.removeChild(checkedDiv);
    return;
  } else if (radio1.checked) {
    radio1.checked = false;
  }

  checkFirstSecond = false;

  if (formContainer.firstElementChild) {
    formContainer.removeChild(checkedDiv);
  }

  if (!formContainer.firstElementChild) {
    let checkedForm = `
            <div class="col-12">
            <label class="order-form-label">Fecha de Envío<span class="form__check"> *</span></label>
            </div>
            <div class="col-12 mb-1">
            <input id="shipping-date" class="form-control" type"datetime-local" placeholder="Selecciona una fecha">
            </div>
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
      `;

    checkedDiv.innerHTML = checkedForm;
    formContainer.append(checkedDiv)
    enableDatePicker();

    /*const shippingDateInput = document.getElementById('shipping-date');
    const today = new Date();
    const tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowParsed = tomorrow.toISOString().split('T')[0];
    shippingDateInput.setAttribute('min', tomorrowParsed);*/
  }
}

const enableDatePicker = () => {
  if (document.getElementById('shipping-date')) {
    flatpickr("#shipping-date", {
      minDate: new Date().fp_incr(1),
      locale: {
        firstDayOfWeek: 1,
        weekdays: {
          shorthand: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
          longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        },
        months: {
          shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Оct', 'Nov', 'Dic'],
          longhand: ['Enero', 'Febreo', 'Мarzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        },
      },
      dateFormat: "d-m-Y",

      "disable": [
        function (date) {
          return (date.getDay() === 0);
        }
      ],
    })
  }
}

const facturaContainer = document.querySelector('.factura__form');
const facturaFormContent = document.createElement('div');
facturaFormContent.classList = "factura__form__content";

function displayFactura() {

  let facturaContent = `
    <div class="factura__form">
    <label for="razon">Razón Social</label>
    <input id="razonSocial" class="order-form-input" type="text" name="razon">
    <label for="cuit">Cuit</label>
    <input id="cuit" class="order-form-input" type="text" name="cuit">
  </div>
  `;

  if (facturaContainer.firstElementChild) {
    facturaContainer.removeChild(facturaFormContent)
  } else {
    facturaFormContent.innerHTML = facturaContent;
    facturaContainer.append(facturaFormContent);
  }
}


