const jsonfile = require('jsonfile');

const file = 'server/data/actions.json';

const addAction = (obj) => {
      jsonfile.readFile(file, (err, data) => {
    if (err) {
      console.log('JSON read err - ' + err);
    } else {
      data.actions.push(obj);
      jsonfile.writeFile(file, data, (err) => {
        if (err) {
          console.log('JSON write err - ' + err);
        } else {
          console.log('JSON file updated');
        }
      });
    }
  });
}

const getActions = () => {
    return jsonfile.readFile(file);
};

module.exports = {getActions, addAction}