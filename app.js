const express = require('express');
const app = express();
const authRouter = require('./routes/authRoute');
const smRouter = require('./routes/smRoute');

app.use(express.json());
app.use('/api/users', authRouter);
app.use('/api/masuk', smRouter);

module.exports = app;