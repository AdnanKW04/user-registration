const express = require("express");

const router = express.Router();

const UserRoute = require("./auth.route");

const defaultRoutes = [{ path: "/auth", route: UserRoute }];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
