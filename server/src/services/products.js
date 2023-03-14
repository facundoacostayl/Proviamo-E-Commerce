const { sheets } = require("../config/db/oAuth2client");
const { httpStatusCodes } = require("../utils/httpStatusCodes");
const { responseHandler } = require("../utils/response.handler");
require("dotenv").config();

const getProducts = async () => {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.ID_GSPREADSHEETS,
    range: "Productos!A2:I",
  });

  if (!response) {
    return responseHandler(
      "Error",
      httpStatusCodes.BAD_REQUEST,
      "Error getting products"
    );
  }

  const rows = response.data.values;
  const products = rows.map((row) => ({
    id: +row[0],
    title: row[1],
    price: +row[2],
    image: row[3],
    category: row[4],
    subcategory: row[5],
    description: row[6],
    fiambres: row[7],
    quesos: row[8],
  }));

  return responseHandler(
    "Success",
    httpStatusCodes.OK,
    "Get products succesfully",
    products
  );
};

const addProducts = async (products) => {
  let values = products.map((p) => [
    p.id,
    p.title,
    p.price,
    p.image,
    p.category,
    p.subcategory,
    p.description,
    p.fiambres,
    p.quesos,
  ]);

  const resource = {
    values,
  };

  const result = await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.ID_GSPREADSHEETS,
    range: "Productos!A2:I",
    valueInputOption: "RAW",
    resource,
  });

  if (!result) {
    return responseHandler(
      "Error",
      httpStatusCodes.BAD_REQUEST,
      "Error updating products"
    );
  }

  return responseHandler(
    "Success",
    httpStatusCodes.OK,
    "Update products succesfully",
    result
  );
};

module.exports = { getProducts, addProducts };
