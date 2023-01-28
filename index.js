const express = require('express');
const cors = require('cors');

const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

const usersBLL = require('./server/BLL/userBLL');

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
  type Query {
    getAllStudents: [Student],
    getStudent(id: Int): [Student]
  }
`);
const root = {
    getAllstudents: studentsBLL.getAllstudents,
    getStudent: studentsBLL.getStudentById,
    };
    
    const app = express();
    const port = 4000;
    
    app.use(cors());
    
    app.use(
      '/graphql',
      graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true, // GraphQL interface in the browser
      })
    );
    
    app.listen(port, () => {
      console.log(
        `Running a GraphQL API server at: http://localhost:${port}/graphql`
      );
    });