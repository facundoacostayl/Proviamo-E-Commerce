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
  try {
    //GET Orders
    const response = await getOrders();

    //CHECK if response returns error and throw error if it does
    if (response.responseType === "Error") throwErrorWithStatus(response);

    return res.send(response);
  } catch (e) {
    res.status(e.statusCode || 400).json({ message: e.message });
  }
};

const addItems = async ({ body }, res) => {
  try {
    //GET ORDER PREFERENCE
    const responseOrder = await getOrderPreference(body);
    //CHECK if responseOrder returns error and throw error if it does
    if (responseOrder.responseType === "Error")
      throwErrorWithStatus(responseOrder);

    //GET ORDER PREFERENCE ID
    const responseId = await getOrderPreferenceId(responseOrder.data);
    //CHECK if responseId returns error and throw error if it does
    if (responseId.responseType === "Error") throwErrorWithStatus(responseId);

    //ADD orders to orders list
    const newOrder = await addOrders(body, responseId.data);
    //CHECK if newOrder returns error and throw error if it does
    if (newOrder.responseType === "Error") throwErrorWithStatus(newOrder);

    return res.send({ preferenceId: responseId });
  } catch (e) {
    res.status(e.statusCode || 400).json({ message: e.message });
  }
};

const updateItems = async (req, res) => {
  try {
    //GET order status
    const responseStatus = await getOrderStatus(req.query.payment_id);
    //CHECK if responseStatus returns error and throw error if it does
    if (responseStatus.responseType === "Error")
      throwErrorWithStatus(responseStatus);
    //UPDATE orders using responseStatus data
    const responseUpdate = await updateOrderStatus(
      responseStatus.data.preferenceId,
      responseStatus.data.status
    );
    //CHECK if responseUpdate returns error and throw error if it does
    if (responseUpdate.responseType === "Error")
      throwErrorWithStatus(responseUpdate);

    //RESOLVE to frontend
    return res.sendFile(require.resolve("../frontend/index.html"));
  } catch (e) {
    res.status(e.statusCode || 400).json({ message: e.message });
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
