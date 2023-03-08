const {
  getOrders,
  addOrders,
  getOrderProducts,
  getOrderId,
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
    const responseOrder = await getOrderProducts(body);
    const responseId = await getOrderId(responseOrder);
    await addOrders(body, response);
    res.send({ response });
  } catch (e) {
    errorHandler(res, e.message, 400);
  }
};

const updateItems = async (req, res) => {
  try {
    const response = await getOrderStatus();
    await updateOrders(response.preferenceId, response.status);
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
