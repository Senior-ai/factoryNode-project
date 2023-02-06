const mongoose = require('mongoose');

const empSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    startWorkYear: Number,
    departmentID: {type: mongoose.Schema.Types.ObjectId, ref: 'department'},
    shifts: [{type: mongoose.Schema.Types.ObjectId, ref: 'shift'}],
  },
  { versionKey: false }
);

const employee = mongoose.model('employee', empSchema);
module.exports = employee;