var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('express-flash');
var session = require('express-session');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var connection  = require('./helper/dbConnection');

var customersRouter = require('./routes');

console.log("in app js")
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ 
    secret: '123456cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.use(flash());


const port = 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
var router = require('./routes');
app.use(router);
app.use(function(req, res, next){
    res.status(404);  
    if (req.accepts('html')) {
      res.render('404');
      return;
    }
  });
module.exports = app;