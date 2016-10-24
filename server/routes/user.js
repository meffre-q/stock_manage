const User = require('../handlers/user');

exports.getAll = {
  method: 'GET',
  path: '/user',
  config: User.getAll
};

exports.getOne = {
  method: 'GET',
  path: '/user/{username}',
  config: User.getOne
};

exports.create = {
  method: 'POST',
  path: '/user',
  config: User.create
};

exports.update = {
  method: 'PUT',
  path: '/user/{username}',
  config: User.update
};

exports.remove = {
  method: 'DELETE',
  path: '/user/{username}',
  config: User.remove
};

exports.me = {
  method: 'POST',
  path: '/user/me',
  config: User.me
};

exports.getItem = {
  method: 'GET',
  path: '/user/item',
  config: User.getItem
};

exports.addItem = {
  method: 'PUT',
  path: '/user/item/{item}',
  config: User.addItem
};

exports.removeItem = {
  method: 'DELETE',
  path: '/user/item/{item}',
  config: User.removeItem
};
