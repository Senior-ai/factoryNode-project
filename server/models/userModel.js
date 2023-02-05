const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    email: String,
    numofActions: Number,
  },
  { versionKey: false }
);

const User = mongoose.model('_user', userSchema);
module.exports = User;