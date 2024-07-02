const express = require("express");
var bodyParser = require("body-parser");
const routes = require("./routes");
const path = require("path");
const httpStatus = require("http-status");
const ApiError = require("./utils/apiError");
const { port } = require("./config/config");
require("./models");

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
