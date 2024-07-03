const { query } = require("express");
const Joi = require("joi");

const addUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    role: Joi.string().required().valid("admin", "customer"),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    search: Joi.string(),
    page: Joi.number().integer(),
    limit: Joi.number().integer(),
  }),
};

const getUserById = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
  }),
};

const deleteUser = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = {
  addUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
