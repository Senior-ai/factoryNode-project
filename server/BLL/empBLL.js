const Employee = require('../models/empModel');

const getAllEmployees = () => {
    return Employee.find();
}
const getEmployeeById = (id) => {
    return Employee.findById({_id: id});
}

const updateEmployee = async (id, obj) => {
    await Employee.findByIdAndUpdate(id, obj);
    return 'Updated';
}

const addEmployee = async (obj) => {
    const emp = new Employee(obj)
    emp.save();
    return 'Created!'; 
}

const deleteEmployee = async (id) => {
    await Employee.findByIdAndDelete(id);
    return 'Deleted';
}

module.exports = {getAllEmployees, getEmployeeById,
updateEmployee, addEmployee, deleteEmployee}