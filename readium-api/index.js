// loading .env file
require("dotenv").config();
// require packages
const express = require("express");
const app = express();

// parse cookie from the client
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const flash = require("connect-flash");

// loading config
const { getUrl } = require("./config/db");

// config passport use strategies
require("./config/passport")(passport);

// middleware

// parsing json data sent from the request.body
app.use(express.json());
// parsing data sent from a form action.
app.use(express.urlencoded({ extended: false }));

// read cookie from browser
app.use(cookieParser());
// session
app.use(
  sessions({
    secret: process.env.SESSION_SECRET,
    // saveUnitialized allow setting the user cookie before they acknowledge :D
    saveUninitialized: true,
    cookie: {
      // expires in 1 year
      maxAge: 1000 * 60 * 60 * 24 * 365,
    },
    resave: false,
    // create a database for storing session
    store: MongoStore.create({
      mongoUrl: getUrl("session"),
    }),
  })
);
// connect-flash message
app.use(flash());

// initialize passport
app.use(passport.initialize());
// create a persistent login session
app.use(passport.session());

// use routes
app.use(require("./routes")(passport));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Express is listening on " + port);
});
