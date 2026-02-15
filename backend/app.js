const cors = require("cors");
var createError = require('http-errors');
var dotenv=require("dotenv").config();
//
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("MongoDB connection error:", err));
//
var express = require('express');
var path = require('path');

const jwt = require("jsonwebtoken");
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//app.use('/', indexRouter);

//const session=require("express-session");


/*const passport = require('passport');
const {Student} =require("./routes/users");

const {Parent} =require("./routes/users");
const {Teacher} =require("./routes/users");*/










//const mailerRoutes = require("./routes/mailer");
//app.use("/mailer", mailerRoutes.router);

var app = express();
// CORS MUST be before routes
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "Disastra_secret"
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use('Student-local', Student.createStrategy());



passport.use('Parent-local', Parent.createStrategy());



passport.use('Teacher-local', Teacher.createStrategy());

passport.serializeUser((user, done) => {
  done(null, { id: user.id, type: user.constructor.modelName });
});

// Deserialize: load user from correct collection
passport.deserializeUser((obj, done) => {
  const modelMap = { Student, Parent, Teacher };
  const Model = modelMap[obj.type];

  if (!Model) return done(new Error("Unknown user type"));

  Model.findById(obj.id)
    .then(user => done(null, user))
    .catch(err => done(err));
});
//*/













app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server error",
  });
});




console.log("Gmail:", process.env.EMAIL_USER);


const PORT = process.env.PORT ;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});






module.exports = app;
