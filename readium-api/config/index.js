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

module.exports = {
  elasticsearch,
  rabbitmq,
  swaggerDoc,
  swaggerUi,
};
