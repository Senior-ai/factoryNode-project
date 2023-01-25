const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema(
  {
    externalId: Number,
    date: Date,
    startingHour: Number,
    endingHour: Number,
  },
  { versionKey: false }
);

const Shift = mongoose.model('shift', shiftSchema);
module.exports = Shift;