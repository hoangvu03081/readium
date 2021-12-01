const mongoose = require("mongoose");
const { getUrl } = require("../utils/db");

mongoose
  .connect(getUrl())
  .then(() => {})
  .catch((err) => console.log(err));
