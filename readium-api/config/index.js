let swaggerUi, swaggerDoc;
if (process.env.NODE_ENV === "test") {
  require("dotenv").config({ path: __dirname + "/env/.env.test" });
} else if (process.env.NODE_ENV === "development") {
  require("dotenv").config({ path: __dirname + "/env/.env" });
  swaggerUi = require("swagger-ui-express");
  swaggerDoc = require("../utils/swagger/swagger_output.json");
}
require("../utils/elasticsearch");
require("../utils/rabbitmq");


const { sessionsParser } = require("./sessions");

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5000",
  "http://localhost",
];

const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
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
  swaggerDoc,
  swaggerUi,
  corsOptions,
  sessionsParser,
};
