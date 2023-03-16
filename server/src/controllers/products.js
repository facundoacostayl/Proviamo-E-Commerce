const { throwErrorWithStatus } = require("../utils/error.handler");
const { getProducts, addProducts } = require("../services/products");

const getItems = async (req, res) => {
  try {
    //GET Products
    const response = await getProducts();

    //CHECK if response returns error and throw error if it does
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
