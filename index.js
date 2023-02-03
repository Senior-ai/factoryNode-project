const express = require('express'); //TODO - unrelated, but delete getUsers functions - you dont need it as it gets fetched once from jsonplaceholder
const cors = require('cors');

//graphQL
const { graphqlHTTP } = require('express-graphql');
const graphqlVar = require('./server/graphql')
const root = graphqlVar.root;
const schema = graphqlVar.schema;

//routers
const authRouter = require('./server/routers/authRouter');

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

    //setting up routers
    app.use('/auth', authRouter);

    app.listen(port, () => {
      console.log(
        `Running a GraphQL API server at: http://localhost:${port}/graphql`
      );
    });

   