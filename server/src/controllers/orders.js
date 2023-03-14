const {
  getOrders,
  addOrders,
  getOrderPreference,
  getOrderPreferenceId,
  updateOrderStatus,
  getOrderStatus,
} = require("../services/orders");
const { throwErrorWithStatus } = require("../utils/error.handler");

const getItems = async (req, res) => {
  const response = await getOrders();

  res.send(response);
};

const addItems = async ({ body }, res) => {
  try {
    const responseOrder = await getOrderPreference(body);
    const responseId = await getPreferenceOrderId(responseOrder.data);
    const newOrder = await addOrders(body, responseId.data);
    res.send(newOrder.data);
  } catch (e) {}
};

const updateItems = async (req, res) => {
  try {
    const response = await getOrderStatus();
    await updateOrders(response.data.preferenceId, response.data.status);
    res.sendFile(require.resolve("./frontend/index.html"));
  } catch (e) {}
};

const updateItemById = async (req, res) => {
  try {
    const response = await getOrderStatus();
    const orders = await getItems();
    const order = orders.find((o) => o.preferenceId === response.preferenceId);
    order.status = response.status;
    await writeOrders(orders);
  } catch (e) {}
};

module.exports = { getItems, addItems, updateItems };
