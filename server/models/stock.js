const Mongoose = require('../database')
  .Mongoose;

const stockSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  color: {
    type: String,
    required: true
  }
});
const Stock = Mongoose.model('Stock', stockSchema);
exports.Stock = Stock;
