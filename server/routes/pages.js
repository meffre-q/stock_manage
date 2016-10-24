const Pages = require('../handlers/pages');

exports.index = {
  method: 'GET',
  path: '/',
  config: Pages.index
};

exports.login = {
  method: 'GET',
  path: '/login',
  config: Pages.login
};

exports.register = {
  method: 'GET',
  path: '/register',
  config: Pages.register
};
