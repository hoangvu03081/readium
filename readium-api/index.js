const app = require("./app");
const port = process.env.PORT || 5000;

const server = app.listen(port);

const { WebSocketServer } = require("ws");
const jwt = require("jsonwebtoken");

const User = require("./models/User");
const { sessionsParser } = require("./config");
const { PUB_KEY } = require("./utils/auth");
const { authMiddleware } = require("./utils/auth");

const wss = new WebSocketServer({ noServer: true });

server.on("upgrade", function (req, socket, head) {
  wss.handleUpgrade(req, socket, head, function (ws) {
    wss.emit("connection", ws, req, socket);
  });
});

wss.on("connection", function (ws, req, socket) {
  sessionsParser(req, {}, async function () {
    const userId = req.session?.passport?.user;
    if (userId) {
      const user = await User.findById(userId);
      ws.user = user;
    }
  });
  ws.on("message", async function (data) {
    const action = JSON.parse(data.toString());
    switch (action.type) {
      case "setAuth": {
        const jwtPayload = jwt.verify(action.payload.token.slice(7), PUB_KEY, {
          algorithms: "RS256",
        });
        const user = await User.findById(jwtPayload.vux);
        ws.user = user;
        break;
      }
      case "setNotification": {
        if (!ws.user) return;
        wss.clients.forEach((client) => {
          if (!client.user) return;

          if (client.user._id.toString() === action.payload.to) {
            client.send(
              JSON.stringify({
                type: "notification",
                from: ws.user._id,
                content: action.payload.content,
                url: "",
                createdAt: "",
              })
            );
          }
        });
        break;
      }
    }
  });
  ws.on("close", function () {});
});

app.post("/notifications/:userId", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['Notification']
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/Email"
          }  
        }
      }
    } 
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/Notification"
          }
        }
      }
    }
  */
  try {
    console.log(req.session);
    // wss.clients.forEach((client) => {
    //   if (!client.user) return;

    //   if (client.user._id.toString() === req.params.userId) {
    //     client.send(
    //       JSON.stringify({
    //         type: "notification",
    //         payload: {
    //           from: req.user._id,
    //           content: "send from swagger",
    //           url: "",
    //           createdAt: "",
    //         },
    //       })
    //     );
    //   }
    // });
    return res.send();
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Something went wrong in send notifications" });
  }
});

app.use((req, res) => {
  return res.status(404).send({ message: "Endpoint not found" });
});

app.use((err, req, res, next) => {
  if (err.message === REQUIRE_ACTIVATE_ACCOUNT) {
    return res.status(401).send({
      message: "Please activate your account before doing this action!",
    });
  } else if (err.message === NO_AUTH_TOKEN) {
    return res.status(401).send({ message: "Unauthenticated" });
  }
  return res.status(500).send({ message: "Some errors" });
});
