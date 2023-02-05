// dep as in Department. i guess thats the best shortcut for it
const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
  {
    name: String,
    managerId: {type: mongoose.Schema.Types.ObjectId, ref: 'employees'},
    managerDetails: {},
    employees: []
  },
  { versionKey: false }
);

const dep = mongoose.model('department', departmentSchema);
module.exports = dep;