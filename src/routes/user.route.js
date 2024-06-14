const express = require("express");
const { userController } = require("../controllers");
const { userValidation } = require("../validations");
const validate = require("../middlewares/validate");
const parseFormData = require("../middlewares/handleFormData");

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

module.exports = router;
