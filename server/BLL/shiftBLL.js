const shift = require('../models/shiftModel');

const getAllShifts = () => {
    return shift.find();
}
const getShiftById = (id) => {
    return shift.findById({_id: id});
}

const updateShift = async (id, obj) => {
    await shift.findByIdAndUpdate(id, obj);
    return 'Updated';
}

const addShift = async (obj) => {
    const shf = new shift(obj)
    shf.save();
    return 'Created!'; 
}

const deleteShift = async (id) => {
    await shift.findByIdAndDelete(id);
    return 'Deleted';
}
module.exports = {getAllShifts, getShiftById, updateShift,
     addShift, deleteShift}