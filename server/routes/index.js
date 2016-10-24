const Pages = require('./pages');
const Login = require('./login');
const User = require('./user');
const Stock = require('./stock');
const Utils = require('./utils');

exports.endpoints = [
  Pages.index,
  Pages.login,
  Pages.register,
  Login.login,
  Login.logout,
  Login.register,
  User.getAll,
  User.getOne,
  User.create,
  User.update,
  User.remove,
  User.me,
  User.getItem,
  User.addItem,
  User.removeItem,
  Stock.getAll,
  Stock.getOne,
  Stock.create,
  Stock.update,
  Stock.remove,
  Utils.style,
  Utils.police,
  Utils.img,
  Utils.scripts
];
