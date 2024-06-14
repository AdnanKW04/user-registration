const express = require("express");
var bodyParser = require("body-parser");
const routes = require("./src/routes");
const path = require("path");
const httpStatus = require("http-status");
const ApiError = require("./src/utils/apiError");
const { port } = require("./src/config/config");
require("./src/models");

const app = express();

app.use(bodyParser.json());

app.use(express.json());

app.use("/v1", routes);

app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.use((req, res, next) =>
  next(new ApiError(httpStatus.NOT_FOUND, "Route not found"))
);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
