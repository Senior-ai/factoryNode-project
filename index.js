const express = require('express');
const cors = require('cors');

const { graphqlHTTP } = require('express-graphql');
const graphqlVar = require('./server/graphql')
const root = graphqlVar.root;
const schema = graphqlVar.schema;
    
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
    //routers
    app.use('/auth', authRouter);

    app.listen(port, () => {
      console.log(
        `Running a GraphQL API server at: http://localhost:${port}/graphql`
      );
    });

   