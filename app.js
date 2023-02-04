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
const app = express();
const URI = 'mongodb+srv://admin:admin@cluster0.pmdqwtv.mongodb.net/Backend-project';

class MongoDB_Handler {
    constructor() {
        try {
            mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true});
            console.log("MongoDB Atlas connection established successfully");
        } catch (err) {
            console.log(`Error occurred while connecting to MongoDB Atlas: ${err}`);
        }

        const connection = mongoose.connection;

        connection.once('open', () => {
            console.log('MongoDB Atlas connection established successfully');
        })
    };

// Class function that creates our base user - Moshe Israeli
    createBaseUser() {
        // Create user schema
        const sampleUser = new userSchema({
            id: 123123,
            first_name: 'moshe',
            last_name: 'israeli',
            birthday: 'January, 10th, 1990'
        });

        //Check if the user already exists in the Collection - if not, create
        userSchema.findOne({id: 123123}, (err, doc) => {
            if(err) return console.log(err);
            if(!doc) {
                sampleUser.save((err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Sample user added to the database");
                    }
                });
            } else {
                console.log("User already exists in the database");
            }
        });
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
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});



handler = new MongoDB_Handler()
handler.createBaseUser();

module.exports = app;
