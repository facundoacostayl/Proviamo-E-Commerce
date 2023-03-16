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
    if (responseOrder.responseType === "Error")
      throwErrorWithStatus(responseOrder);
    const responseId = await getPreferenceOrderId(responseOrder.data);
    if (responseId.responseType === "Error") throwErrorWithStatus(responseId);
    const newOrder = await addOrders(body, responseId.data);
    if (newOrder.responseType === "Error") throwErrorWithStatus(newOrder);

    res.send(newOrder);
  } catch (e) {
    res.status(e.statusCode).send(e.message);
  }
};

const updateItems = async (req, res) => {
  try {
    const responseStatus = await getOrderStatus();
    if (responseStatus.responseType === "Error")
      throwErrorWithStatus(responseStatus);
    const responseUpdate = await updateOrders(
      responseStatus.data.preferenceId,
      responseStatus.data.status
    );
    if (responseUpdate.responseType === "Error")
      throwErrorWithStatus(responseUpdate);

    res.sendFile(require.resolve("./frontend/index.html"));
  } catch (e) {
    res.status(e.statusCode).send(e.message);
  }
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
