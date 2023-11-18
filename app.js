const express = require('express');

const usersRouter = require('./routes/usersRouter');
const app = express();

app.use('/api/users', usersRouter);

module.exports = app;