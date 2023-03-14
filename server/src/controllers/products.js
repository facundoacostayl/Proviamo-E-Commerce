const { throwErrorWithStatus } = require("../utils/error.handler");
const { getProducts, addProducts } = require("../services/products");

const getItems = async (req, res) => {
  try {
    const response = await getProducts();
    res.send(response);
  } catch (e) {}
};

const addItems = async (req, res) => {
  try {
    res.sendStatus(200);
  } catch (e) {}
};

module.exports = { getItems, addItems };
