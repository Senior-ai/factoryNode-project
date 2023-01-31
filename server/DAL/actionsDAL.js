const jsonfile = require('jsonfile');

const file = './data/actions.json'

const addAction = () => {
    jsonfile.writeFile(file); //check if its correct
    return 'updated';
}

const getActions = () => {
    return jsonfile.readFile(file);
}

module.exports = {getActions, addAction}