const { getProducts } = require("../services/products");
const mercadopago = require("../config/payway/mercadopago");
const { sheets } = require("../config/db/oAuth2client");
const { responseHandler } = require("../utils/response.handler");
const { httpStatusCodes } = require("../utils/httpStatusCodes");

const getOrders = async () => {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: "1csLKz4P6rmXNs633SgqAF3Gn6ktb8B6Y4zbOD7sYA84",
    range: "Orders!A2:E",
  });

  //STRUGGLING HERE
  const rows = response.data.values || [];
  const orders = rows.map((row) => ({
    preferenceId: row[0],
    items: JSON.parse(row[1]),
    shipping: JSON.parse(row[2]),
    date: row[3],
    status: row[4],
  }));

  return responseHandler(
    "Success",
    httpStatusCodes.OK,
    "Orders found succesfully",
    orders
  );
};

const addOrders = async (order, preferenceId) => {
  order.date = new Date().toISOString();
  order.preferenceId = preferenceId;
  order.status = "Pendiente";
  const orders = await getOrders();
  orders.push(order.items);

  let values = orders.map((order) => [
    order.preferenceId,
    JSON.stringify(order.items),
    JSON.stringify(order.shipping),
    order.date,
    order.status,
  ]);

  const resource = {
    values,
  };

  await sheets.spreadsheets.values.update({
    spreadsheetId: "1csLKz4P6rmXNs633SgqAF3Gn6ktb8B6Y4zbOD7sYA84",
    range: "Orders!A2:E",
    valueInputOption: "RAW",
    resource,
  });

  return responseHandler(
    "Success",
    httpStatusCodes.OK,
    "Order added succesfully",
    values
  );
};

const updateOrders = async (orders) => {
  const values = orders.map((order) => [
    order.preferenceId,
    JSON.stringify(order.finalOrder),
    order.total,
    JSON.stringify(order.shipping),
    order.date,
    order.status,
  ]);

  const resource = {
    values,
  };
  const result = await sheets.spreadsheets.values.update({
    spreadsheetId: "1csLKz4P6rmXNs633SgqAF3Gn6ktb8B6Y4zbOD7sYA84",
    range: "Orders!A2:F",
    valueInputOption: "RAW",
    resource,
  });

  return responseHandler("Success", 200, "Order updated succesfully", result);
};

const getOrderPreference = async (order) => {
  const ids = order.items.map((p) => p.id);
  const productsCopy = await getProducts();

  let preference = {
    items: [],
    back_urls: {
      success: "http://localhost:3000/api/orders/feedback",
      failure: "http://localhost:3000/api/orders/feedback",
      pending: "http://localhost:3000/api/orders/feedback",
    },
    auto_return: "approved",
  };

  ids.forEach((id) => {
    const product = productsCopy.find((p) => p.id === id);
    preference.items.push({
      title: product.title,
      unit_price: product.price,
      quantity: 1,
    });
  });

  return responseHandler(
    "Success",
    200,
    "Mercado Pago preference object created succesfully",
    preference
  );
};

const getOrderPreferenceId = async (preference) => {
  const response = await mercadopago.preferences.create(preference);
  const preferenceId = response.body.id;
  return responseHandler(
    "Success",
    httpStatusCodes.OK,
    "Preference id found succesfully",
    preferenceId
  );
  /*order.date = new Date().toISOString();
  order.preferenceId = preferenceId;
  order.status = "Pendiente";
  const orders = await getOrders();*/
};

const updateOrderStatus = async (preferenceId, status) => {
  const orders = await getOrders(); //CHECK THIS
  const order = orders.find((o) => o.preferenceId === preferenceId);
  order.status = status;
  const orderUpdated = await updateOrders(orders);
  return responseHandler(
    "Success",
    200,
    "Order Status updated succesfully",
    orderUpdated
  );
};

const getOrderStatus = async () => {
  const payment = await mercadopago.payment.findById(req.query.payment_id);
  const merchantOrder = await mercadopago.merchant_orders.findById(
    payment.body.order.id
  );
  const preferenceId = merchantOrder.body.preference_id;
  const status = payment.body.status;

  return responseHandler("Success", 200, "Order Status found succesfully", {
    preferenceId,
    status,
  });
};

module.exports = {
  getOrders,
  addOrders,
  getOrderPreference,
  getOrderPreferenceId,
  updateOrderStatus,
  getOrderStatus,
};
