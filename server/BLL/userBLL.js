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
            maxActions: user.maxActions,
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
/*
const getJsonAction = ({userId}) => {
    const data = actions.getActions();
    console.log('DATA (userBLL.js) - '+data)
    const date = new Date();
    const filteredData = data.filter(d =>
        d.userId === {userId} && d.date === date);
    const sortedData = filteredData.sort((a,b) =>
    new Date(b.date) - new Date(a.date));
    const action = sortedData.shift();
    console.log('ACTION (userBLL.js) - ' + action)
    return action;
}*/
module.exports = {getAllUsers, getUserById,
updateUser}