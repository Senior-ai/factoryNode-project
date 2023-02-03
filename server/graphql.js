const depBLL = require('./BLL/depBLL');
const empBLL = require('./BLL/empBLL');
const shiftBLL = require('./BLL/shiftBLL');
const userBLL = require('./BLL/userBLL');

const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Employee {
    profession: String
    score: Int
  }
  type User {
    id: Int
    name: String
    faculty: String
  }
  type Department {
    _id: Int
    name: String
    managerId: Int
  }
  type shift {
    date: String,
    startingHour: Int,
    endingHour: Int,
  }
  type Query {
    getAllUsers: [User],
    getUser(id: Int): [User]
  }
`);

// The 'root' provides a resolver function for each API endpoint
const root = {
getAllUsers: userBLL.getAllUsers,
getUser: userBLL.getUserById,
};

module.exports = {schema, root}