const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  age: {
    type: Number,
  },
});

//NOTE model === collection

const User = mongoose.model('user', UserSchema);

module.exports = User //export default User
