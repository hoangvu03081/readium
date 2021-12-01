const { elasticsearch, rabbitmq, swaggerDoc, swaggerUi } = require("./config");

const express = require("express");
const app = express();

const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const sessions = require("express-session");
const MongoStore = require("connect-mongo");

const { getUrl } = require("./utils/db");

require("./config/db");
require("./config/passport")(passport);

app.use(cookieParser());
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use(
  sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
    },
    resave: false,
    store: MongoStore.create({
      mongoUrl: getUrl("session"),
    }),
  })
);

// allow React application to make HTTP requests to Express application
var allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5000",
  "http://localhost" /** other domains if any */,
];
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg =
        "The CORS policy for this site does not " +
        "allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
};
app.use(cors(corsOptions));

app.use(passport.initialize());
app.use(passport.session()); // create a persistent login session

app.use(require("./routes"));

if (process.env.NODE_ENV === "development")
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use((err, req, res, next) => {
  if (err.message === "No auth token") {
    return res.status(401).send({ message: "Unauthenticated" });
  }
  return res.status(500).send({ message: "Some errors" });
});

module.exports = app;
