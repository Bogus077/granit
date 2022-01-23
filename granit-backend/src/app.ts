// import express from 'express';

// const app = express();
// const port = 3000;
// app.get('/', (request, response) => {
//   response.send('Hello world!');
// });
// app.listen(port, () => console.log(`Running on port ${port}`));

'use strict';

const express = require('express');
// const {
//   userRouter,
//   mapRouter,
//   skillRouter,
//   specializationRouter,
//   materialRouter,
//   answerRouter,
//   ticketRouter,
//   subRouter,
// } = require('./routes');
// const { tokenValidation } = require('./middlewares');
const { serverConfig } = require('./config/config');
const cors = require('cors');
const app = express();

// app.use(tokenValidation);
app.use(cors());
app.get('/', (request, response) => {
  response.send('Hello world!!!!!!!!!!!');
});

app.listen(serverConfig);

console.log(`App started on ${serverConfig.port}`);
