const jsonfile = require('jsonfile');

const file = 'server/data/actions.json';

const addAction = (data) => {
    jsonfile.writeFile(file, data, (err) => {
        if (err) console.log('JSON err - ' +err);
    }); 
    return 'updated';
}

const getActions = () => {
    return jsonfile.readFile(file);
};

module.exports = {getActions, addAction}