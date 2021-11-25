const Response = require("../models/Response");

const response = (req, res, next) => {
  if (!res.responseObj) res.responseObj = new Response();
  res.responseObj.reset();
  return next();
};

module.exports = response;