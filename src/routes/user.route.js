const express = require("express");
const { userController } = require("../controllers");
const { userValidation } = require("../validations");
const validate = require("../middlewares/validate");
const parseFormData = require("../middlewares/handleFormData");
const auth = require("../middlewares/auth");

const router = express();

router
  .route("/addUser")
  .post(
    auth("manageByAdmin"),
    validate(userValidation.addUser),
    userController.addUser
  );

router
  .route("/getUsers")
  .get(
    auth("manageByAdmin"),
    validate(userValidation.getUsers),
    userController.getUsers
  );

router
  .route("/getUserById/:userId")
  .get(
    auth("manageByAdmin"),
    validate(userValidation.getUserById),
    userController.getUserById
  );

router
  .route("/updateUser/:userId")
  .put(
    auth("manageByAdmin"),
    validate(userValidation.updateUser),
    userController.updateUser
  );

router
  .route("/delete/:userId")
  .delete(
    auth("manageByAdmin"),
    validate(userValidation.deleteUser),
    userController.deleteUser
  );

module.exports = router;
