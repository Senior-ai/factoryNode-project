const mongoose = require('mongoose');

const empSchema = new mongoose.Schema(
  {
    _id: Number,
    firstName: String,
    lastName: String,
    startWorkYear: Number,
    departmentID: {type: mongoose.Schema.Types.ObjectId, ref: 'department'},
  },
  { versionKey: false }
);

const Employee = mongoose.model('employee', empSchema);
module.exports = Employee;