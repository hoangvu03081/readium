if (process.env.NODE_ENV === "development") require("dotenv").config();
const express = require("express");
const app = express();

const elasticsearch = require("./utils/elasticsearch");
const rabbitmq = require("./utils/rabbitmq");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const sessions = require("express-session");
const MongoStore = require("connect-mongo");

const response = require("./middleware/response");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./utils/swagger/swagger_output.json");

const { getUrl } = require("./config/db");
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
app.use(cors());

app.use(passport.initialize());
app.use(passport.session()); // create a persistent login session

app.use(response);

app.use(require("./routes"));

if (process.env.NODE_ENV === "development")
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use((err, req, res, next) => {
  console.log(err);
  const { responseObj } = res;
  if (err.message === "No auth token") {
    responseObj.messages = ["Unauthenticated"];
    return res.status(401).send(responseObj);
  }
  responseObj.messages = ["Some errors"];
  return res.status(500).send(responseObj);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Express is listening on " + port);
});
