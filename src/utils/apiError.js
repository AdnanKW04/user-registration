class ApiError extends Error {
  constructor(statusCode, message, stack, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.data = null;
    this.success = false;

    if (stack) this.stack = stack;
    else Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
