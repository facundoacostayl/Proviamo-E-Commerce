//Class created in order to extend the class "Error" and add new properties as statusCode as in this case
class ErrorWithStatus extends Error {
  status = 0;

  get statusCode() {
    return this.status;
  }

  set statusCode(code) {
    this.status = code;
  }
}

//Function for throwing a new ErrorWithStatus
const throwErrorWithStatus = (response) => {
  const error = new ErrorWithStatus(response.message);
  error.statusCode = response.statusCode;

  throw error;
};

module.exports = { throwErrorWithStatus };
