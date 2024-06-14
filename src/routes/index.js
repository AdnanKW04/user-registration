const express = require("express");

const router = express.Router();

const UserRoute = require("./user.route");

const defaultRoutes = [{ path: "/user", route: UserRoute }];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
