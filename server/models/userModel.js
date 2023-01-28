const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    _id: Number,
    fullName: String,
    numofActions: Number,
  },
  { versionKey: false }
);

const User = mongoose.model('user', userSchema);
module.exports = User;