//  Mercado Pago's SDK
const mercadopago = require("mercadopago");
require("dotenv").config();

// Credentials
mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN_MP,
});

module.exports = mercadopago;
