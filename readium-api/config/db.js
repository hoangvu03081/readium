const mongoose = require("mongoose");
const { getUrl } = require("../utils");

mongoose
  .connect(getUrl())
  .then(() => {})
  .catch((err) => console.log(err));
