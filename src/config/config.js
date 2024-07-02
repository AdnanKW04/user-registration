require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  baseUrl: process.env.BASE_URL,
  connectionUrl: process.env.CONNECTION_URL,
  jwtSecret: process.env.JWT_SECRET,
  accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION,
  refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION,
  emailCreds: {
    service: "gmail",
    userEmail: "adnanqaidjoher8962@gmail.com",
    appPassword: "ylws eoia ottu juim",
  },
};
