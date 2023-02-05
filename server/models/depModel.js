// dep as in Department. i guess thats the best shortcut for it
const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
  {
    name: String,
    managerId: {type: mongoose.Schema.Types.ObjectId, ref: 'employee'},
    employees: [{type: mongoose.Schema.Types.ObjectId, ref: 'employee'}]
  },
  { versionKey: false }
);

const department = mongoose.model('department', departmentSchema);
module.exports = department;