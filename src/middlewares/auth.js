const { resolve } = require("path");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");
const passport = require("./passport");
const { rolesRight } = require("../config/roles");
const { commonService } = require("../utils/mongoHelpers");
const { tokenTypes } = require("../constant/token");
const Token = require("../models/token");

const verifyToken =
  (req, resolve, reject, requiredRole) => async (err, user, info) => {
    if (err || info || !user) {
      return reject(
        new ApiError(httpStatus.UNAUTHORIZED, "Please Authenticate")
      );
    }

    req.user = user;

    const reqToken = req.headers.authorization.replace("Bearer ", "");
    const tokenExist = await commonService.getOne({
      model: Token,
      query: {
        token: reqToken,
        tokenType: tokenTypes.accessToken,
        status: true,
      },
    });

    if (!tokenExist) {
      return reject(
        new ApiError(httpStatus.UNAUTHORIZED, "Please Authenticate")
      );
    }

    if (requiredRole) {
      const userRoles = rolesRight["admin"];

      if (!userRoles) {
        return reject(new ApiError(httpStatus.FORBIDDEN, "FORBIDDEN"));
      }

      if (!userRoles.includes(requiredRole)) {
        return reject(new ApiError(httpStatus.FORBIDDEN, "FORBIDDEN"));
      }
    }

    resolve();
  };

const auth = (requiredRole) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "jwt",
      { session: false },
      verifyToken(req, resolve, reject, requiredRole)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = auth;
