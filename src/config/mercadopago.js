//  Mercado Pago's SDK
const mercadopago = require("mercadopago");
require('dotenv').config();

// Credentials
mercadopago.configure({
  access_token: "APP_USR-8484108289794507-112514-8e5d0769cbe0ddd38747a8c83d5e63e2-1190318373",
});

module.exports = mercadopago;