const User = require('../models/user').User;
const Boom = require('boom');

exports.index = {
  auth: 'jwt',
  handler(request, reply) {
    reply('Index');
  }
}

exports.login = {
  auth: false,
  handler(request, reply) {
    reply('Login');
//    reply.file('./src/login.html');
  }
}

exports.getAll = {
    handler(request, reply) {
        User.find({}, (err, user) => {
            if (!err) {
                reply(user);
            } else {
                reply(Boom.badImplementation(err)); // 500 error
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
                reply(Boom.badImplementation(err)); // 500 error
            }
        });
    }
};
