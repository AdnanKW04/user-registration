const mongoose = require("mongoose");
const { connectionUrl } = require("../config/config");

mongoose.connect(connectionUrl);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to MongoDB:", err);
});
