const httpStatus = require("http-status");
const ApiError = require("./apiError");

const catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (Object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

module.exports = { catchAsync, pick };
