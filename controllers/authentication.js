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
  handler(req, reply) {
    reply(`Hi your username is ${req.payload.username}`);
  }
}

exports.register = {
  validate: {
    payload: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },
  handler(req, reply) {
    reply(`Hi your username is ${req.payload.username}`);
  }
}

exports.logout = {
  handler(req, res) {
    reply('You are logout.');
  }
}

exports.create = {
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
                reply(user).created('/user/' + user._id); // HTTP 201
            } else {
              throw err;
/*                if (11000 === err.code || 11001 === err.code) {
                    reply(Boom.forbidden("please provide another username, it already exist"));
                } else reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403*/
            }
        });
    }
};

exports.update = {
    validate: {
        payload: {
            username: Joi.string().required()
        }
    },
    handler(request, reply) {
        User.findOne({
            'username': request.params.username
        }, (err, user) => {
            if (!err) {
                user.password = request.payload.password;
                user.save((err, user) => {
                    if (!err) {
                        reply(user).updated('/user/' + user._id); // HTTP 201
                    } else {
                        if (11000 === err.code || 11001 === err.code) {
                            reply(Boom.forbidden("please provide another username, it already exist"));
                        } else reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
                    }
                });
            } else {
                reply(Boom.badImplementation(err)); // 500 error
            }
        });
    }
};

exports.remove = {
    handler(request, reply) {
        User.findOne({
            'username': request.params.username
        }, (err, user) => {
            if (!err && user) {
                user.remove();
                reply({
                    message: "User deleted successfully"
                });
            } else if (!err) {
                // Couldn't find the object.
                reply(Boom.notFound());
            } else {
                reply(Boom.badRequest("Could not delete user"));
            }
        });
    }
};
