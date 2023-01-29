const department = require('../models/depModel');

const getAllDepartments = () => {
    return department.find({});
};
const getDepartmentById = ({id}) => {
    return department.findById({_id: id});
}
const updateDepartment = async (args) => {
    await department.findByIdAndUpdate(args.id, args.dep);
    return 'Updated!';
}
const addDepartment = async (args) => {
    const dep = new department(args.dep);
    await dep.save();
    return 'Created!';
}
module.exports = {getAllDepartments, getDepartmentById,
updateDepartment, addDepartment}