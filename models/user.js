const Mongoose = require('../database').Mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Mongoose.Schema({
  username: { type: String,  required: true, index: { unique: true } },
  password: { type: String,  required: true },
  admin:    { type: Boolean, required: true },
});
userSchema.plugin(passportLocalMongoose, { usernameField: 'email', hashfield: 'password', usernameLowerCase: true });
const User = Mongoose.model('User', userSchema);
exports.User = User;
