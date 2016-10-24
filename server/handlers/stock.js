const Boom = require('boom');
const Joi = require('joi');
const Stock = require('../models/stock')
  .Stock;

exports.getAll = {
  handler(request, reply) {
    Stock.find({}, (err, stock) => {
      if (err) {
        return reply(Boom.badImplementation(err));
      }
      return reply(stock);
    });
  }
};

exports.getOne = {
  handler(request, reply) {
    Stock.findOne({
      name: request.params.item
    }, (err, stock) => {
      if (err) {
        return reply(Boom.badImplementation(err));
      }
      return reply(stock);
    });
  }
};

exports.create = {
  validate: {
    payload: {
      name: Joi.string()
        .required(),
      color: Joi.string()
        .required()
    }
  },
  handler(request, reply) {
    var stock = new Stock(request.payload);
    stock.save((err, _stock) => {
      if (err) {
        if (err.code === 11000 || err.code === 11001) {
          return reply(Boom.forbidden('please provide another stockname, it already exist'));
        }
        return reply(Boom.forbidden(err));
      }
      return reply(_stock)
        .created('/stock/' + _stock.name);
    });
  }
};

exports.update = {
  validate: {
    payload: {
      color: Joi.string()
        .required()
    }
  },
  handler(request, reply) {
    Stock.findOne({
      name: request.params.item
    }, (err, stock) => {
      if (err) {
        return reply(Boom.badImplementation(err));
      }
      stock.color = request.payload.color;
      stock.save((error, _stock) => {
        if (error) {
          if (error.code === 11000 || error.code === 11001) {
            return reply(Boom.forbidden('please provide another stockname, it already exist'));
          }
          return reply(Boom.forbidden(error));
        }
        return reply(_stock)
          .updated('/stock/' + _stock.name);
      });
      return 1;
    });
  }
};

exports.remove = {
  handler(request, reply) {
    Stock.findOne({
      name: request.params.item
    }, (err, stock) => {
      if (err) {
        return reply(Boom.badRequest('Could not delete stock'));
      } else if (!err && !stock) {
        return reply(Boom.notFound());
      }
      stock.remove();
      return reply({
        message: 'Stock deleted successfully'
      });
    });
  }
};
