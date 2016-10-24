const Login = require('../handlers/login');

exports.login = {
  method: 'POST',
  path: '/login',
  config: Login.login
};

exports.logout = {
  method: 'GET',
  path: '/logout',
  config: Login.logout
};

exports.register = {
  method: 'POST',
  path: '/register',
  config: Login.register
};
