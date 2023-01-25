const mongoose = require('mongoose');

const connectDB = () => {
  mongoose
    .connect('mongodb://127.0.0.1:27017/usersDB')
    .then(() => console.log('Connected to usersDB!'))
    .catch((error) => console.log(error));
};

module.exports = connectDB;
//The db's name is confusing but,
//all of the collections can be found in this DB.