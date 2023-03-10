const {
  getOrders,
  addOrders,
  getOrderPreference,
  getOrderPreferenceId,
  updateOrders,
  getOrderStatus,
} = require("../services/orders");
const { errorHandler } = require("../utils/error.handle");

const getItems = async (req, res) => {
  const response = await getOrders();

  res.send(response);
};

const addItems = async ({ body }, res) => {
  try {
    const responseOrder = await getOrderPreference(body);
    const responseId = await getPreferenceOrderId(responseOrder);
    const newOrder = await addOrders(body, responseId);
    res.send(newOrder);
  } catch (e) {
    errorHandler(res, e.message, 400);
  }
};

const updateItems = async (req, res) => {
  try {
    const response = await getOrderStatus();
    await updateOrders(response.data.preferenceId, response.data.status);
    res.sendFile(require.resolve("./frontend/index.html"));
  } catch (e) {
    errorHandler(res, e.message, 400);
  }
};

const updateItemById = async (req, res) => {
  try {
    const response = await getOrderStatus();
    const orders = await getItems();
    const order = orders.find((o) => o.preferenceId === response.preferenceId);
    order.status = response.status;
    await writeOrders(orders);
  } catch (e) {
    errorHandler(res, e.message, 400);
  }
};

module.exports = { getItems, addItems, updateItems };
