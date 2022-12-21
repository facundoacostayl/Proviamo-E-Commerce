const { getProducts } = require("../services/products");
const mercadopago = require("../config/mercadopago");
const { sheets } = require("../config/oAuth2client");

const getOrders = async () => {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: "1csLKz4P6rmXNs633SgqAF3Gn6ktb8B6Y4zbOD7sYA84",
    range: "Orders!A2:E",
  });

  const rows = response.data.values || [];
  const orders = rows.map((row) => ({
    preferenceId: row[0],
    items: JSON.parse(row[1]),
    shipping: JSON.parse(row[2]),
    date: row[3],
    status: row[4],
  }));

  return orders;
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
};

const getOrderId = async (order) => {
  const ids = order.items.map((p) => p.id);
  const productsCopy = await getProducts();

  let preference = {
    items: [],
    back_urls: {
      success: "http://localhost:3000/orders/feedback",
      failure: "http://localhost:3000/orders/feedback",
      pending: "http://localhost:3000/orders/feedback",
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

  const response = await mercadopago.preferences.create(preference);
  const preferenceId = response.body.id;
  return preferenceId;
  /*order.date = new Date().toISOString();
  order.preferenceId = preferenceId;
  order.status = "Pendiente";
  const orders = await getOrders();*/
};

const updateOrders = async (preferenceId, status) => {
  const orders = await readOrders();
  const order = orders.find((o) => o.preferenceId === preferenceId);
  order.status = status;
  await writeOrders(orders);
};

const getOrderStatus = async () => {
  const payment = await mercadopago.payment.findById(req.query.payment_id);
  const merchantOrder = await mercadopago.merchant_orders.findById(
    payment.body.order.id
  );
  const preferenceId = merchantOrder.body.preference_id;
  const status = payment.body.status;

  return {preferenceId, status};
};

module.exports = {
  getOrders,
  addOrders,
  getOrderId,
  updateOrders,
  getOrderStatus,
};
