const Mongoose = require('../database')
  .Mongoose;

const userSchema = new Mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: false
  },
  item: {
    type: Array,
    required: false
  },
  settings: {
    display: {
      type: Number,
      required: true
    }
  }
});
const User = Mongoose.model('User', userSchema);
exports.User = User;
