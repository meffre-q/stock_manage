const Joi = require('joi');
const Database = require('../database');
const User = require('../models/user').User;

exports.login = {
  validate: {
    payload: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  },
  handler: function (req, reply) {
    reply(`Hi your email is ${req.payload.eamil}`);
  }
}

exports.register = {
  validate: {
    payload: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  },
  handler: function (req, reply) {
    reply(`Hi your email is ${req.payload.eamil}`);
  }
}
