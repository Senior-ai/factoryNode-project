const express = require('express'); //TODO - unrelated, but delete getUsers functions - you dont need it as it gets fetched once from jsonplaceholder
const cors = require('cors');

const connectDB = require('./server/configs/db')
//routers
const authRouter = require('./server/routers/authRouter');
const depRouter = require("./server/routers/depRouter");
const shiftsRouter = require('./server/routers/shiftsRouter');
const userRouter = require('./server/routers/userRouter');
const empRouter = require('./server/routers/empRouter');
  //setting up port and routers
  const app = express();
    const port = 4000;

    connectDB();
    app.use(cors());
    app.use(express.json());
    app.use('/login', authRouter);
    app.use('/departments', depRouter);
    app.use('/shifts', shiftsRouter);
    app.use('/users', userRouter);
    app.use('/employees', empRouter);
    app.listen(port, () => {
      console.log(
        `Running an API server at: http://localhost:${port}/departments`
      );
    });

   