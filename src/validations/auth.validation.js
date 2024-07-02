const { query } = require("express");
const Joi = require("joi");

const registerUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const userMedia = [{ name: "profileImage", maxCount: 1 }];

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const refreshToken = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    logoutFromAllDevices: Joi.bool().required(),
  }),
};

module.exports = {
  registerUser,
  userMedia,
  verifyEmail,
  login,
  refreshToken,
  logout,
};
