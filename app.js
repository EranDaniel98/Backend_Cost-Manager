const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const userSchema = require('./models/userSchema')
const mongoose = require('mongoose');

const addCostRouter = require('./routes/add_cost');
const reportRouter = require('./routes/report');
const aboutRouter = require('./routes/about');
const {Schema} = require("mongoose");
const app = express();

class MongoDB_Handler {
    constructor(serverIP, serverPort) {
        mongoose.Promise = global.Promise;
        try {
            mongoose.connect('mongodb://' + serverIP + ':' + serverPort);
            console.log("Successfully connected to MongoDB server")
            console.log("Server connection details: " + serverIP + ':' + serverPort)
        } catch (error) {
            console.error(error);
        }
    };

    createBaseUser() {
        const sampleUser = new userSchema({
            id: 123123,
            first_name: 'moshe',
            last_name: 'israeli',
            birthday: 'January, 10th, 1990'
        });
        if (!userSchema.exists(sampleUser)){
            sampleUser.save((err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Sample user added to the database");
                }
            });
        }
    }
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', addCostRouter);
app.use('/', reportRouter);
app.use('/', aboutRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

handler = new MongoDB_Handler('127.0.0.1', 27017)
handler.createBaseUser();

module.exports = app;
