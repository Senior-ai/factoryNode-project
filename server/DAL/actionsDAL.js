const jsonfile = require('jsonfile');

const file = './data/actions.json'

const addAction = (data) => {
    jsonfile.writeFile(file, data, (err) => {
        if (err) console.log('JSON err - ' +err);
    }); //check if its correct
    return 'updated';
}

const getActions = () => {
    return jsonfile.readFile(file);
}

module.exports = {getActions, addAction}