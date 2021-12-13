const MongoStore = require("connect-mongo");

const { getUrl } = require("../utils/db");
let swaggerUi, swaggerDoc, elasticsearch, rabbitmq;

if (process.env.NODE_ENV === "test") {
  require("dotenv").config({ path: __dirname + "/env/.env.test" });
} else {
  elasticsearch = require("../utils/elasticsearch");
  rabbitmq = require("../utils/rabbitmq");
}
if (process.env.NODE_ENV === "development") {
  require("dotenv").config({ path: __dirname + "/env/.env" });
  swaggerUi = require("swagger-ui-express");
  swaggerDoc = require("../utils/swagger/swagger_output.json");
}

const sessionsOptions = {
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
  },
  resave: false,
  store: MongoStore.create({
    mongoUrl: getUrl("session"),
  }),
};

const allowedOrigins = [
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
      const msg =
        "The CORS policy for this site does not " +
        "allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
};

module.exports = {
  elasticsearch,
  rabbitmq,
  swaggerDoc,
  swaggerUi,
  sessionsOptions,
  corsOptions,
};
