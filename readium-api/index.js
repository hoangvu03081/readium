const app = require("./app");
const port = process.env.PORT || 5000;
const websocket = require("./routes/api/websocket");

const server = app.listen(port, () => {
  console.log("Express is listening on " + port);
});

websocket(server);
