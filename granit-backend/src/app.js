'use strict';

const express = require('express');
const { userRouter } = require('./routes');
// const { tokenValidation } = require('./middlewares');
const { serverConfig } = require('./config/config');
var cors = require('cors');
const app = express();

// app.use(tokenValidation);
app.use(cors());
app.use('/user', userRouter);

app.listen(serverConfig);

console.log(`App started on ${serverConfig.port}`);
