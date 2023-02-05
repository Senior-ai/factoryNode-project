const mongoose = require('mongoose');

const empSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    startWorkYear: Number,
    departmentID: {type: mongoose.Schema.Types.ObjectId, ref: 'department'},
  },
  { versionKey: false }
);

const employee = mongoose.model('employee', empSchema);
module.exports = employee;