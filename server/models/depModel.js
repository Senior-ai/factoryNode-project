// dep as in Department. i guess thats the best shortcut for it

const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
  {
    _id: Number,
    name: String,
    managerId: Number,
  },
  { versionKey: false }
);

const Dep = mongoose.model('department', departmentSchema);
module.exports = Dep;