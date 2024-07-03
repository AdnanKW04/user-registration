require("dotenv").config();

module.exports = {
  port: process.env.PORT || 4000,
  baseUrl: process.env.BASE_URL || "http://192.168.31.238:4000/",
  connectionUrl: process.env.CONNECTION_URL || "mongodb://localhost:27017/test",
  jwtSecret: process.env.JWT_SECRET || "ASDhffcSAEWvbc",
  accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION || "1d",
  refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || "2d",
  emailCreds: {
    service: "gmail",
    userEmail: "adnanqaidjoher8962@gmail.com",
    appPassword: "ylws eoia ottu juim",
  },
};
