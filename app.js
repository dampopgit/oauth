const express = require('express');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const app = express();
const passportSetup = require("./config/passport-setup");

var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = require("jquery")(window);


const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require('cookie-session');
const passport = require('passport');

// set view engine
app.set('view engine', 'ejs');


// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb

mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true }, ()=>{
  console.log("connected to mongo you mongo")
})

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// home route

app.get("/", (req,res)=>{
res.render("home");

});

app.listen(3000, ()=> {
  console.log("app is listenting on 3000 port ");
});
