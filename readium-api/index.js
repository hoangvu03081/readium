// loading .env file
require("dotenv").config();
// require packages
const express = require("express");
const app = express();

const rabbitmq = require("./utils/rabbitmq");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const MongoStore = require("connect-mongo");
// cors
const cors = require("cors");

// loading config
const {getUrl} = require("./config/db");

// config passport use strategies
require("./config/passport")(passport);

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
      // expires in 10 year
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
    },
    resave: false,
    // create a database for storing session
    store: MongoStore.create({
      mongoUrl: getUrl("session"),
    }),
  })
);

// allow React application to make HTTP requests to Express application
app.use(cors());

// initialize passport
app.use(passport.initialize());
// create a persistent login session
app.use(passport.session());


// use routes
app.use(require("./routes"));

// error handling
app.use((err, req, res, next) => {
  console.log(err);
  if (err.message === "No auth token")
    return res.status(401).send({ message: ["Unauthenticated"] });
  return res.status(500).send({ message: ["Some error"] });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Express is listening on " + port);
});
