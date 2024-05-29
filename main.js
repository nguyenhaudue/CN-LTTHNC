const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
LocalStrategy = require("passport-local"),
passportLocalMongoose = 
    require("passport-local-mongoose")
// Use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const route = require('./blog/src/routes');
const db = require('./blog/src/config/db');
const User = require("./blog/src/app/models/User");
//Connect to DB
db.connect();

app.use(require("express-session")({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false
}));
 
app.use(passport.initialize());
app.use(passport.session());
 
// Showing secret page
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/secret", isLoggedIn, function (req, res) {
  res.render("secret");
});

// Showing register form
app.get("/register", function (req, res) {
  res.render("register");
});
// Showing register form
app.get("/register", function (req, res) {
  res.render("register");
});

// Handling user signup
app.post("/register", async (req, res) => {
  const user = await User.create({
    username: req.body.username,
    password: req.body.password
  });
 
  return res.redirect("/login");
});

//Showing login form
app.get("/login", function (req, res) {
  res.render("login");
});

//Handling user login
app.post("/login", async function(req, res){
  try {
      // check if the user exists
      const user = await User.findOne({ username: req.body.username });
      if (user) {
        //check if password matches
        const result = req.body.password === user.password;
        if (result) {
          res.render("secret");
        } else {
          res.status(400).json({ error: "password doesn't match" });
        }
      } else {
        res.status(400).json({ error: "User doesn't exist" });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
});

//Handling user logout 
app.get("/logout", function (req, res) {
  req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}


app.use(
  express.urlencoded({
    extended:true,
  })
)

//app.use(bacbaove)

//function bacbaove(req,res,next){
  //if(['vethuong','vevip'].includes(req.query.ve)){
   //   req.face = 'Gâu Gâu Gâu !!!';
   // return next();
 // }
  //res.status(403).json({
  //message : "Access denied"
  //})
//}
// HTTP logger


app.use(morgan('combined'));

// chèn hình vào trong trang
app.use(express.static(path.join(__dirname, 'public')))

app.use(methodOverride('_method'));

// Template engine
const hbs = handlebars.create({ extname: '.hbs' , helpers : { sum : (a , b) => a + b}});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'blog\\src\\resources\\views'));

//Routes Init
route(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
