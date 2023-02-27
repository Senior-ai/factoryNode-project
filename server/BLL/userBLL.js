const actions = require('../DAL/actionsDAL');
const user = require('../models/userModel');
//Users cant get deleted.
const getAllUsers = async () => {
    const userData = [];
    const { actions: actionsAllowed } = await actions.getActions();
    const usersDB = await user.find({});
    usersDB.forEach((user) => {
        const obj = {
            id: user._id,
            userId: user.id,
            name: user.name,
            maxActions: user.numOfActions,
            numOfActions: user.numOfActions
        };
        actionsAllowed.forEach((per) => {
          if (per.userId === obj.userId)
          {
              let today = new Date();
              var dd = String(today.getDate()).padStart(2, '0');
              var mm = String(today.getMonth() + 1).padStart(2, '0');
              var yyyy = today.getFullYear();
              let todayString = dd + "/" + mm + "/" + yyyy;
              if (todayString === per.date) {
                 obj.numOfActions = per.actionAllowed;
              }
          }});
        userData.push(obj)
    });
    return userData;
}

const getUserById = ({id}) => {
    return user.findById({id});
}

const updateUser = async (id, obj) => {
    await user.findByIdAndUpdate(id, obj);
    return 'Updated';
}

const addAction = async (obj) => {
    actions.addAction(obj); //TODO - Change it
    return 'Created';
}

// const getJsonAction = () => {
//     return actions.getActions();
// }
module.exports = {getAllUsers, getUserById, addAction,
updateUser}