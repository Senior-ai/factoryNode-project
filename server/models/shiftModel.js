const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema(
  {
    date: Date,
    startingHour: Number,
    endingHour: Number,
    employees: [{}],
  },
  { versionKey: false }
);

const Shift = mongoose.model('shift', shiftSchema);
module.exports = Shift;