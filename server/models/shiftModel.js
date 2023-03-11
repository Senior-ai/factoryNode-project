const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema(
  {
    Date: String,
    StartingHour: Number,
    EndingHour: Number,
    employees: [{type: mongoose.Schema.Types.ObjectId, ref: 'employee'}],
  },
  { versionKey: false }
);

const Shift = mongoose.model('shift', shiftSchema);
module.exports = Shift;