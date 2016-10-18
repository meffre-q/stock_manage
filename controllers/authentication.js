const Joi = require('joi');
const User = require('../models/user').User;
const Boom = require('boom');

exports.login = {
  validate: {
    payload: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },
  handler(request, reply) {
    User.findOne({username: request.params.username}, (err, user) => {
      if (err) {
        reply(Boom.badImplementation(err));
      }
      if (!user) {
        reply(Boom.forbidden(err));
      } else if (user) {
        if (user.password != request.params.password) {
          reply(Boom.forbidden(err));
        } else {
          reply('toto');
        }
      }
    });
  }
};

exports.register = {
  validate: {
      payload: {
          username: Joi.string().required(),
          password: Joi.string().required()
      }
  },
  handler(request, reply) {
      var user = new User(request.payload);
      user.save(user, (err, user) => {
          if (!err) {
              reply(user).created('/user/' + user.username);
          } else {
            throw err;
              if (11000 === err.code || 11001 === err.code) {
                  reply(Boom.forbidden("please provide another username, it already exist"));
              } else reply(Boom.forbidden(getErrorMessageFrom(err)));
          }
      });
  }
};

exports.logout = {
  handler(req, res) {
    reply('').redirect('/login');
  }
};
