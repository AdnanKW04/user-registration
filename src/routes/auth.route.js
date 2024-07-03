const express = require("express");
const { authController } = require("../controllers");
const { authValidation } = require("../validations");
const validate = require("../middlewares/validate");
const parseFormData = require("../middlewares/handleFormData");
const auth = require("../middlewares/auth");

const router = express();

router
  .route("/register")
  .post(
    parseFormData(authValidation.userMedia),
    validate(authValidation.registerUser),
    authController.registerUser
  );

router
  .route("/verifyEmail")
  .get(validate(authValidation.verifyEmail), authController.verifyEmail);

router
  .route("/login")
  .post(validate(authValidation.login), authController.login);

router
  .route("/refreshToken")
  .post(validate(authValidation.refreshToken), authController.refreshToken);

router
  .route("/logout")
  .post(
    auth("manageByAdmin"),
    validate(authValidation.logout),
    authController.logout
  );

module.exports = router;
