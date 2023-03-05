//This function is for handling services responses.

const responseHandler = (type, statusCode, message, data, token) => {
  const response = {
    responseType: type,
    statusCode,
    message,
    data,
    token,
  };
  return response;
};

module.exports = { responseHandler };
