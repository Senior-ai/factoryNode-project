const mongoose = require('mongoose');

const empSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    startWorkYear: Number,
    departmentID: {type: mongoose.Schema.Types.ObjectId, ref: 'departments'},
  },
  { versionKey: false }
);

const Employee = mongoose.model('employee', empSchema);
module.exports = Employee;