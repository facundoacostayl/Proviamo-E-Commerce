const { getProducts } = require("../services/products");
const mercadopago = require("../config/payway/mercadopago");
const { sheets } = require("../config/db/oAuth2client");
const { responseHandler } = require("../utils/response.handler");
const { httpStatusCodes } = require("../utils/httpStatusCodes");

const getOrders = async () => {
  //GET Orders from DB
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: "1csLKz4P6rmXNs633SgqAF3Gn6ktb8B6Y4zbOD7sYA84",
    range: "Orders!A2:E",
  });

  //CHECK if orders exists, otherwise return error
  if (!response) {
    return responseHandler(
      "Error",
      httpStatusCodes.BAD_REQUEST,
      "Orders not found"
    );
  }

  //GET orders data from response
  const rows = response.data.values || [];

  //CREATE a new array of orders getted from rows
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
  //GET Orders from getOrders function
  const orders = await getOrders();

  //CHECK if orders exists, otherwise return error
  if (!orders.data) {
    return responseHandler(
      "Error",
      httpStatusCodes.BAD_REQUEST,
      "Orders not found"
    );
  }

  //GET orders data from orders
  const ordersData = orders.data;

  //INSERT "date" key in order called from arguments
  order.date = new Date().toISOString();
  //INSERT "preferenceId" key in order called from arguments
  order.preferenceId = preferenceId;
  //INSERT "status" key in order called from arguments
  order.status = "Pendiente";

  //PUSH items from orders into ordersData
  ordersData.push(order);

  //Create a new array with updated ordersData values
  let values = ordersData.map((order) => [
    order.preferenceId,
    JSON.stringify(order.items),
    JSON.stringify(order.shipping),
    order.date,
    order.status,
  ]);

  //INSERT values array in an object
  const resource = {
    values,
  };

  //UPDATE DB inserting resource object
  const result = await sheets.spreadsheets.values.update({
    spreadsheetId: "1csLKz4P6rmXNs633SgqAF3Gn6ktb8B6Y4zbOD7sYA84",
    range: "Orders!A2:E",
    valueInputOption: "RAW",
    resource,
  });

  //CHECK if result went ok, otherwise return error
  if (!result) {
    return responseHandler(
      "Error",
      httpStatusCodes.BAD_REQUEST,
      "Orders update error"
    );
  }

  return responseHandler(
    "Success",
    httpStatusCodes.OK,
    "Order added succesfully",
    values
  );
};

const updateOrders = async (orders) => {
  //CREATE a new array of orders getted from function argument
  const values = orders.map((order) => [
    order.preferenceId,
    JSON.stringify(order.finalOrder),
    order.total,
    JSON.stringify(order.shipping),
    order.date,
    order.status,
  ]);

  //INSERT values array in an object
  const resource = {
    values,
  };

  //UPDATE DB inserting resource object
  const result = await sheets.spreadsheets.values.update({
    spreadsheetId: "1csLKz4P6rmXNs633SgqAF3Gn6ktb8B6Y4zbOD7sYA84",
    range: "Orders!A2:F",
    valueInputOption: "RAW",
    resource,
  });

  //CHECK if result went ok, otherwise return error
  if (!result) {
    return responseHandler(
      "Error",
      httpStatusCodes.BAD_REQUEST,
      "Orders update error"
    );
  }

  return responseHandler("Success", 200, "Order updated succesfully", values);
};

const getOrderPreference = async (order) => {
  //GET Products from getProducts products service function
  const productsCopy = await getProducts();

  //CHECK if productsCopy exists, otherwise return error
  if (!productsCopy.data) {
    return responseHandler(
      "Error",
      httpStatusCodes.BAD_REQUEST,
      "Get products error"
    );
  }

  //GET id values of items from order function argument
  const ids = order.items.map((p) => p.id);

  //CREATE preference value for Mercado Pago
  let preference = {
    items: [],
    back_urls: {
      success: "http://localhost:3000/api/orders/feedback",
      failure: "http://localhost:3000/api/orders/feedback",
      pending: "http://localhost:3000/api/orders/feedback",
    },
    auto_return: "approved",
  };

  //GET products from productsCopy based in order ids and pushing them into preference object items value
  ids.forEach((id) => {
    const product = productsCopy.data.find((p) => p.id === id);
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
  //CREATE Mercado Pago preference id and getting request response
  const response = await mercadopago.preferences.create(preference);

  //CHECK if response exists, otherwise return
  if (!response) {
    return responseHandler(
      "Error",
      httpStatusCodes.BAD_REQUEST,
      "Error creating Mercado Pago preference"
    );
  }

  //CREATE a new variable with the preference id getted from response
  const preferenceId = response.body.id;

  return responseHandler(
    "Success",
    httpStatusCodes.OK,
    "Preference id found succesfully",
    preferenceId
  );
};

const updateOrderStatus = async (preferenceId, status) => {
  //GET Orders from getOrders function
  const orders = await getOrders();

  //CHECK if orders data exists, otherwise return
  if (!orders.data) {
    return responseHandler(
      "Error",
      httpStatusCodes.BAD_REQUEST,
      "Get products error"
    );
  }

  //CREATE a new variable with orders data
  const ordersData = orders.data;

  //GET order to be updated data
  const orderToUpdate = ordersData.find((o) => o.preferenceId === preferenceId);
  //GET order to be updated index
  const orderToUpdateIndex = ordersData.findIndex(
    (o) => o.preferenceId === preferenceId
  );

  //UPDATE order to be updated status value with status argument
  orderToUpdate.status = status;
  //UPDATE ordersData to be orderToUpdate
  ordersData[orderToUpdateIndex] = orderToUpdate;
  //PUSH orderToUpdate into ordersData
  const newOrders = ordersData.push(orderToUpdate);
  //UPDATE orders from DB with updateOrders function
  const orderUpdated = await updateOrders(newOrders);

  //CHECK if orderUpdated went ok, otherwise return
  if (!orderUpdated.data) {
    return responseHandler(
      "Error",
      httpStatusCodes.BAD_REQUEST,
      "Update orders error"
    );
  }

  return responseHandler(
    "Success",
    200,
    "Order Status updated succesfully",
    orderUpdated
  );
};

const getOrderStatus = async () => {
  //GET payment id from Mercado Pago
  const payment = await mercadopago.payment.findById(req.query.payment_id);

  //CHECK if payment exists, otherwise return
  if (!payment) {
    return responseHandler(
      "Error",
      httpStatusCodes.BAD_REQUEST,
      "Error finding Mercado Pago payment"
    );
  }

  //GET merchant order from Mercado Pago
  const merchantOrder = await mercadopago.merchant_orders.findById(
    payment.body.order.id
  );

  //CHECK if merchantOrder exists, otherwise return
  if (!merchantOrder) {
    return responseHandler(
      "Error",
      httpStatusCodes.BAD_REQUEST,
      "Error finding Mercado Pago merchant order"
    );
  }

  //CREATE a new variable with merchantOrder data
  const preferenceId = merchantOrder.body.preference_id;
  //CREATE a new variable with payment data
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
