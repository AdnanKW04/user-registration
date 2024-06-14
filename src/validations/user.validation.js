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

module.exports = { registerUser, userMedia, verifyEmail };
