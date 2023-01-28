const usersWS = require('../DAL/usersWS');
const actions = require('../DAL/actionsDAL');

const department = require('../models/depModel');
const employee = require('../models/empModel');
const shift = require('../models/shiftModel');
const user = require('../models/userModel');


const addAction = (id, obj) => {
    actions.addAction(id, obj);
    return 'Created';
}


module.exports = {authUser, addAction}