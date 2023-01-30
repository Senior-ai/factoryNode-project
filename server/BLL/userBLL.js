const usersWS = require('../DAL/usersWS');
const actions = require('../DAL/actionsDAL');


const employee = require('../models/empModel');
const shift = require('../models/shiftModel');
const user = require('../models/userModel');

const getAllUsers = () => {
    return user.find({})
}
const getUserById = ({id}) => {
    return user.findById({id});
}

const addUser = (args) => {

}

const addAction = (id, obj) => {
    actions.addAction(id, obj);
    return 'Created';
}


module.exports = {getAllUsers, getUserById}