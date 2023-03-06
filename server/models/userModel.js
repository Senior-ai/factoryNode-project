const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    email: String,
    maxActions: Number,
    numOfActions: Number,
  },
  { versionKey: false }
);

const User = mongoose.model('_user', userSchema);
module.exports = User;