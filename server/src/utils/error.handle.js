const errorHandler = (res, message, status) => {
    res.send({error: message});
}

module.exports = {errorHandler};