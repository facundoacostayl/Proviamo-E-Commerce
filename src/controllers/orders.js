const {getOrders, addOrders, getOrderId} = require('../services/orders');
const {errorHandler} = require('../utils/error.handle');

const getItems = async(req, res) => {
    const response = await getOrders();

    res.send(response);
}

const addItems = async({body}, res) => {
    try {
        const response = await getOrderId(body);
        //await addOrders(body, response);
        res.send({response});
    }catch(e) {
        errorHandler(res, e.message, 400);
    }
}

module.exports = {getItems, addItems};