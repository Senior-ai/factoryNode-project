const jsonfile = require('jsonfile');

const file = 'server/data/actions.json';

const addAction = async (obj) => {
  try {
    const data = await jsonfile.readFile(file);
    data.actions.push(obj);
    await jsonfile.writeFile(file, data);
    console.log('JSON file updated');
  } catch (err) {
    console.log('JSON write err - ' + err);
  }
}

const getActions = async () => {
    return await jsonfile.readFile(file);
};

module.exports = {getActions, addAction}