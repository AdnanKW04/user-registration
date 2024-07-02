const express = require("express");
const { userController } = require("../controllers");
const { userValidation } = require("../validations");
const validate = require("../middlewares/validate");
const parseFormData = require("../middlewares/handleFormData");
const auth = require("../middlewares/auth");

const router = express();

router
  .route("/register")
  .post(
    parseFormData(userValidation.userMedia),
    validate(userValidation.registerUser),
    userController.registerUser
  );

router
  .route("/verifyEmail")
  .get(validate(userValidation.verifyEmail), userController.verifyEmail);

router
  .route("/login")
  .post(validate(userValidation.login), userController.login);

router
  .route("/refreshToken")
  .post(validate(userValidation.refreshToken), userController.refreshToken);

router
  .route("/logout")
  .post(
    auth("manageByAdmin"),
    validate(userValidation.logout),
    userController.logout
  );

module.exports = router;
