const { WebSocketServer } = require("ws");

module.exports = function (server) {
  const wss = new WebSocketServer({ server });
  wss.on("connection", function (ws) {
    ws.on("message", function (data) {
      const action = JSON.parse(data.toString());
      switch (action.type) {
        case "setAuth": {
          console.log(action.payload);
          break;
        }
        case "setNotification": {
          console.log(action.payload);
          break;
        }
      }
    });
    ws.on("close", function () {});
  });
};
