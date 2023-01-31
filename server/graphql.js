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
    date: Date,
    startingHour: Int,
    endingHour: Int,
  }
  type Query {
    getAllStudents: [Student],
    getStudent(id: Int): [Student]
  }
  type Mutation {

  }
`);

// The 'root' provides a resolver function for each API endpoint
const root = {
getAllstudents: studentsBLL.getAllstudents,
getStudent: studentsBLL.getStudentById,
};

module.exports = {schema, root}