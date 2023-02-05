const actions = require('../DAL/actionsDAL');
const user = require('../models/userModel');
//Users cant get deleted.
const getAllUsers = () => {
    return user.find()
}
const getUserById = ({id}) => {
    return user.findById({id});
}

const updateUser = async (id, obj) => {
    await user.findByIdAndUpdate(id, obj);
    return 'Updated';
}

const addAction = async (id, obj) => {
    actions.addAction(id, obj); //TODO - Change it
    await updateUser(id, obj);
    return 'Created';
}


module.exports = {getAllUsers, getUserById, addAction,
updateUser}