const {errorHandler} = require('../utils/error.handle');
const {getProducts, addProducts} = require('../services/products');

const getItems = async(req, res) => {
    try {
        const response = await getProducts();
        res.send(response);
    }catch(e) {
        errorHandler(res, "ERROR_GET_PRODUCTS", 400);
    }
};

const addItems = async(req, res) => {
    try {
        res.send('IT WORKS AGAIN BROOOOOOOOOOOOOOOOOO!!!!!!!!!!!!!!');
    }catch(e) {
        errorHandler(res, "ERROR_ADD_PRODUCTS", 400);
    }
};

module.exports = {getItems, addItems};