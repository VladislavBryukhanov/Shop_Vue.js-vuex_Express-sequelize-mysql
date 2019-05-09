const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const corsOptions = {
    origins: 'localhost:8080'
};

const sequelize = require('./db/connection');
const session = require('express-session');

const authRouter = require('./routes/auth');

sequelize.authenticate();

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRouter);

module.exports = app;
