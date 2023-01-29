const Employee = require('../models/empModel');

const getAllEmployees = () => {
    return Employee.find({});
}
const getEmployeeById = ({id}) => {
    return Employee.findById({_id: id});
}

const updateEmployee = async (args) => {
    await Employee.findByIdAndUpdate(args.id, args.Employee);
    return 'Updated';
}

const addEmployee = async (args) => {
    const emp = new Employee(args.Employee)
    emp.save();
    return 'Created!'; 
}

module.exports = {getAllEmployees, getEmployeeById,
}