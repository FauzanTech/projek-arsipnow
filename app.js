const express = require('express');
const app = express();
const authRouter = require('./routes/authRoute');
const smRouter = require('./routes/smRoute');
const userRouter = require('./routes/userRoute');

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/masuk', smRouter);
app.use('/api/user', userRouter);

module.exports = app;