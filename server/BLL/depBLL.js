const department = require('../models/depModel');
const employee = require('../models/empModel');

const getAllDepartments = async () => {
    try {
        const deps = await department.find()
        .populate({path: 'managerId', select: 'firstName lastName startWorkYear'})
        .populate({path: 'employees', select: 'firstName lastName startWorkYear'});
        //console.log(deps);
        return deps;
    } catch (err) {
        console.error(err);
        throw err;
    }
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
    const newDep = await dep.save();
    return {id: newDep._id, department: newDep};
}
const deleteDepartment = async (id) => {
    await department.findByIdAndDelete(id);
    return 'Deleted';
}
module.exports = {getAllDepartments, getDepartmentById,
updateDepartment, addDepartment, deleteDepartment}