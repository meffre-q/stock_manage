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
