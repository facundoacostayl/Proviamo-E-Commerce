const {errorHandler} = require('../utils/error.handle');
 
const getItems = async(res, req) => {
    try {
        res.send('IT WORKS BROOOOOOOO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    }catch(e) {
        errorHandler(res, "ERROR_GET_PRODUCTS", 400);
    }
};

module.exports = {getItems};