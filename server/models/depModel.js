// dep as in Department. i guess thats the best shortcut for it
const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
  {
    _id: Number,
    name: String,
    managerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Employee'},
  },
  { versionKey: false }
);

const dep = mongoose.model('department', departmentSchema);
module.exports = dep;