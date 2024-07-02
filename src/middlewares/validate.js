const httpStatus = require("http-status");
const Joi = require("joi");
const { pick } = require("../utils/helper");
const ApiError = require("../utils/apiError");

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["body", "query", "params"]);
  const reqObj = pick(req, Object.keys(validSchema));

  const { value, error } = Joi.compile(validSchema)
    .prefs({
      errors: { label: "key" },
      abortEarly: false,
    })
    .validate(reqObj);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");

    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }

  Object.assign(req, value);

  return next();
};

module.exports = validate;
