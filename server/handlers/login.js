const Boom = require('boom');
const Jwt = require('jsonwebtoken');
const Joi = require('joi');

const User = require('../models/user')
  .User;
const Config = require('../config/config');

exports.login = {
  validate: {
    payload: {
      username: Joi.string()
        .required(),
      password: Joi.string()
        .required()
    }
  },
  handler(request, reply) {
    User.findOne({
      username: request.payload.username
    }, (err, user) => {
      if (err) {
        return reply(Boom.badImplementation(err));
      }
      if (!user) {
        return reply(Boom.forbidden(err));
      } else if (user) {
        if (user.password !== request.payload.password) {
          return reply(Boom.forbidden(err));
        }
        user.token = Jwt.sign({
          id: user._id,
          username: user.username
        }, Config.server.key, {
          algorithm: 'HS256',
          expiresIn: '1H'
        });
        user.save((error, _user) => {
          if (error) {
            return reply(Boom.forbidden(error));
          }
          return reply({
            token: _user.token
          }).header('Authorization', request.headers.authorization);
        });
      }
      return 1;
    });
  }
};

exports.register = {
  validate: {
    payload: {
      username: Joi.string()
        .required(),
      password: Joi.string()
        .required()
    }
  },
  handler(request, reply) {
    var user = new User(request.payload);
    user.save((err) => {
      if (!err) {
        return reply(user)
          .created('/user/' + user.username);
      }
      if (err.code === 11000 || err.code === 11001) {
        return reply(Boom.forbidden('please provide another username, it already exist'));
      }
      return reply(Boom.forbidden(err));
    });
  }
};

exports.logout = {
  handler(request, reply) {
    User.findOne({
      token: request.auth.credentials.token
    }, (err, user) => {
      if (err) {
        return reply(Boom.badImplementation(err));
      }
      user.token.setText('');
      user.save((error) => {
        if (error) {
          return reply(Boom.badImplementation(error));
        }
        return 1;
      });
      return 1;
    });
    return reply().code(204);
  }
};
