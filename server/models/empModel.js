const mongoose = require('mongoose');

const empSchema = new mongoose.Schema(
  {
    _id: Number,
    firstName: String,
    lastName: String,
    startWorkYear: Number,
    departmentID: Number,
  },
  { versionKey: false }
);

const Employee = mongoose.model('employee', empSchema);
module.exports = Employee;