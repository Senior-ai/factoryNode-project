const actions = require('../DAL/actionsDAL');
const user = require('../models/userModel');

const getAllUsers = () => {
    return user.find({})
}
const getUserById = ({id}) => {
    return user.findById({id});
}

const addAction = (id, obj) => {
    actions.addAction(id, obj);
    return 'Created';
}


module.exports = {getAllUsers, getUserById, addAction}