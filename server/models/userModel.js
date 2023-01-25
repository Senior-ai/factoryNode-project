const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    externalId: Number,
    fullName: String,
    numofActions: Number,
  },
  { versionKey: false }
);

const User = mongoose.model('user', userSchema);
module.exports = User;