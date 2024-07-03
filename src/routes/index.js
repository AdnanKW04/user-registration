const express = require("express");

const router = express.Router();

const AuthRoute = require("./auth.route");
const UserRoute = require("./user.route");

const defaultRoutes = [
  { path: "/auth", route: AuthRoute },
  { path: "/user", route: UserRoute },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
