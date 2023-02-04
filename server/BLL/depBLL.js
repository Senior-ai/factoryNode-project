const department = require('../models/depModel');

const getAllDepartments = () => {
    return department.find();
};
const getDepartmentById = (id) => {
    return department.findById({_id: id});
}
    
const updateDepartment = async (id, obj) => {
    await department.findByIdAndUpdate(id, obj);
    return 'Updated!';
}
const addDepartment = async (obj) => {
    const dep = new department(obj);
    await dep.save();
    return 'Created!';
}
const deleteDepartment = async (id) => {
    await department.findByIdAndDelete(id);
    return 'Deleted';
}
module.exports = {getAllDepartments, getDepartmentById,
updateDepartment, addDepartment, deleteDepartment}