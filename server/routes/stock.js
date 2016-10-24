const Stock = require('../handlers/stock');

exports.getAll = {
  method: 'GET',
  path: '/stock',
  config: Stock.getAll
};

exports.getOne = {
  method: 'GET',
  path: '/stock/{item}',
  config: Stock.getOne
};

exports.create = {
  method: 'POST',
  path: '/stock',
  config: Stock.create
};

exports.update = {
  method: 'PUT',
  path: '/stock/{item}',
  config: Stock.update
};

exports.remove = {
  method: 'DELETE',
  path: '/stock/{item}',
  config: Stock.remove
};
