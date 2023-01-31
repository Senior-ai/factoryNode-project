const mongoose = require('mongoose');

const empSchema = new mongoose.Schema(
  {
    _id: Number,
    firstName: String,
    lastName: String,
    startWorkYear: Number,
    departmentID: {type: mongoose.Schema.Types.ObjectId, ref: 'departments'},
  },
  { versionKey: false }
);

const Employee = mongoose.model('employees', empSchema);
module.exports = Employee;