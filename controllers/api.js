const Boom = require('boom');
const Joi = require('joi');
const User = require('../models/user.js').User;

exports.api = {
  handler(request, reply) {
    reply({ message: "Welcome to stock_manage api"});
  }
};

exports.getAll = {
    handler(request, reply) {
        User.find({}, (err, user) => {
            if (!err) {
                reply(user);
            } else {
                reply(Boom.badImplementation(err));
            }
        });
    }
};

exports.getOne = {
    handler(request, reply) {
        User.findOne({
            'username': request.params.username
        }, (err, user) => {
            if (!err) {
                reply(user);
            } else {
                reply(Boom.badImplementation(err));
            }
        });
    }
};

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
                        reply(user).updated('/user/' + user.username);
                      } else {
                        if (11000 === err.code || 11001 === err.code) {
                            reply(Boom.forbidden("please provide another username, it already exist"));
                        } else reply(Boom.forbidden(getErrorMessageFrom(err)));
                    }
                });
            } else {
                reply(Boom.badImplementation(err));
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
                reply(Boom.notFound());
            } else {
                reply(Boom.badRequest("Could not delete user"));
            }
        });
    }
};
