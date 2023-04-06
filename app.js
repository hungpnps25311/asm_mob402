var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/category');
var productRouter = require('./routes/product');




/*
conect mongodb
*/
const { Mongoose } = require("mongoose");
const mongoose = require("mongoose");


/**
dotenv 
*/
const dotenv = require('dotenv');
dotenv.config();



//model
require('./models/CategoryModel');
require('./models/ProductModel');
// require('./models/CategoryModel');





var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*
connect mongodb
*/
const connection = mongoose
  .connect(
    (process.env.MONGODB_URL_CONNECT),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() =>
    console.log("============================= mongodb connection successly")
  )
  .catch((err) => console.log("============================ error DB ", err));

module.exports = app;
