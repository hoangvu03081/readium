const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.sendStatus(201);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Express is listening on " + port);
});
