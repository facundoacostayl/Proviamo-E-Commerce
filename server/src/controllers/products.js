const { throwErrorWithStatus } = require("../utils/error.handler");
const { getProducts, addProducts } = require("../services/products");

const getItems = async (req, res) => {
  try {
    const response = await getProducts();
    if (response.responseType === "Error") throwErrorWithStatus(response);

    res.send(response);
  } catch (e) {
    res.status(e.statusCode).send(e.message);
  }
};

const addItems = async (req, res) => {
  try {
    res.sendStatus(200);
  } catch (e) {}
};

module.exports = { getItems, addItems };
