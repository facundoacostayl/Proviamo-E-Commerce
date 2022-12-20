//  Mercado Pago's SDK
const mercadopago = require("mercadopago");
require('dotenv').config();

// Credentials
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN_TEST,
});

module.exports = mercadopago;