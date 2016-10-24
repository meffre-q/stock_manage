const Boom = require('boom');
const Joi = require('joi');

const User = require('../models/user')
  .User;
const Stock = require('../models/stock')
  .Stock;

let getUser = (name, callback) => {
  User.findOne({
    username: name
  }, (err, user) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, user);
  });
};

let getItem = (user, item, callback) => {
  Stock.findOne({
    name: item
  }, (err, _item) => {
    if (err) {
      return callback(null, err, null);
    }
    return callback(user, null, _item);
  });
};

exports.getAll = {
  handler(request, reply) {
    User.find({}, (err, user) => {
      if (err) {
        return reply(Boom.badImplementation(err));
      }
      return reply(user);
    });
  }
};

exports.getOne = {
  handler(request, reply) {
    User.findOne({
      username: request.params.username
    }, (err, user) => {
      if (err) {
        return reply(Boom.badImplementation(err));
      }
      return reply(user);
    });
  }
};

exports.create = {
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
    user.token = '';
    user.item = [];
    user.settings.display = 10;
    user.save((err, username) => {
      if (err) {
        if (err.code === 11000 || err.code === 11001) {
          return reply(Boom.forbidden('please provide another username, it already exist'));
        }
        return reply(Boom.forbidden(err));
      }
      return reply(username)
        .created('/user/' + username.username);
    });
  }
};

exports.update = {
  validate: {
    payload: {
      username: Joi.string()
        .min(3)
        .max(20)
        .required()
    }
  },
  handler(request, reply) {
    User.findOne({
      username: request.params.username
    }, (err, user) => {
      if (err) {
        return reply(Boom.badImplementation(err));
      }
      user.password = request.payload.password;
      user.save((error, username) => {
        if (error) {
          if (error.code === 11000 || error.code === 11001) {
            return reply(Boom.forbidden('please provide another username, it already exist'));
          }
          return reply(Boom.forbidden(error));
        }
        return reply(username)
          .updated('/user/' + username.username);
      });
      return 1;
    });
  }
};

exports.remove = {
  handler(request, reply) {
    User.findOne({
      username: request.params.username
    }, (err, user) => {
      if (err) {
        return reply(Boom.badRequest('Could not delete user'));
      } else if (!err && !user) {
        return reply(Boom.notFound());
      }
      user.remove();
      return reply({
        message: 'User deleted successfully'
      });
    });
  }
};

exports.me = {
  validate: {
    payload: {
      display: Joi.number()
        .min(5)
        .max(50)
        .required(),
      username: Joi.string()
        .min(3)
        .max(20)
        .required(),
      password: Joi.string()
        .min(3)
        .max(20)
        .required()
    }
  },
  handler(request, reply) {
    User.findOne({
      username: request.payload.username
    }, (err, user) => {
      if (err) {
        return reply(Boom.badRequest('Could not delete user'));
      } else if (!err && !user) {
        return reply(Boom.notFound());
      }
      User.findOne({
        username: 'jojo'
      }, (_err, _user) => {
        if (_err) {
          return reply(Boom.badRequest('Could not delete user'));
        } else if (!_err && !_user) {
          return reply(Boom.notFound());
        }
        _user.username = request.payload.username;
        _user.password = request.payload.password;
        _user.settings.display = request.payload.display;
        _user.save((error, username) => {
          if (error) {
            return reply(Boom.forbidden(error));
          }
          return reply(username);
        });
        return 1;
      });
      return 1;
    });
    return 1;
  }
};

exports.getItem = {
  handler(request, reply) {
    User.findOne({
      token: request.auth.credentials.token
    }, (err, user) => {
      if (err) {
        return reply(Boom.badRequest('Could not delete user'));
      } else if (!err && !user) {
        return reply(Boom.notFound());
      }
      return reply(user.item);
    });
  }
};

exports.addItem = {
  handler(request, reply) {
    getUser(request.auth.credentials.token, (err, user) => {
      if (err) {
        return reply(Boom.badRequest('Could not find user'));
      }
      getItem(user, request.params.item, (_user, _err, item) => {
        if (_err) {
          return reply(Boom.badRequest('Could not find item'));
        }
        user.item.push(item);
        user.save((__err) => {
          if (__err) {
            return reply(Boom.badRequest('Could not find user'));
          }
          return 1;
        });
        return reply(_user)
          .created('/user/item');
      });
      return 1;
    });
  }
};

exports.removeItem = {
  handler(request, reply) {
    getUser(request.auth.credentials.token, (err, user) => {
      if (err) {
        return reply(Boom.badRequest('Could not find user'));
      }
      getItem(user, request.params.item, (_user, _err, item) => {
        if (_err) {
          return reply(Boom.badRequest('Could not find item'));
        }
        user.item.splice(item, 1);
        user.save((__err) => {
          if (__err) {
            return reply(Boom.badRequest('Could not find user'));
          }
          return 1;
        });
        return reply({
          message: 'Item deleted successfully'
        });
      });
      return 1;
    });
  }
};
