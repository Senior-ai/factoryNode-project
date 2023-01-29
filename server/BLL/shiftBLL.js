const shift = require('../models/shiftModel');

const getAllShifts = () => {
    return shift.find({});
}
const getShiftById = ({id}) => {
    return shift.findById({_id: id});
}

const updateShift = async (args) => {
    await shift.findByIdAndUpdate(args.id, args.shift);
    return 'Updated';
}

const addShift = async (args) => {
    const shf = new shift(args.shift)
    shf.save();
    return 'Created!'; 
}

module.exports = {getAllShifts, getShiftById, updateShift,
     addShift}