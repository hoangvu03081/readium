const app = require("./app");
const port = process.env.PORT || 5000;

const server = app.listen(port);

const Post = require("./models/Post");
const { WebSocketServer } = require("ws");
const { REQUIRE_ACTIVATE_ACCOUNT, NO_AUTH_TOKEN } = require("./utils");
const { search } = require("./utils/elasticsearch");

const wss = new WebSocketServer({ noServer: true });

server.on("upgrade", function (req, socket, head) {
  wss.handleUpgrade(req, socket, head, function (ws) {
    wss.emit("connection", ws, req, socket);
  });
});

require("./routes/api/websocket-handler")(app, wss);

app.post("/search", async (req, res) => {
  /*
  #swagger.tags = ['Search']
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: 'object',
          properties: {
            keyword: {
              type: 'string'
            }
          }
        }
      }
    }
  }
*/
  try {
    const { keyword } = req.body;
    if (!keyword) {
      return res.status(400).send();
    }
    const arr = req.body.keyword.split(" ");
    const text = arr.filter((word) => word[0] !== "#").join(" ");
    const tags = arr.filter((word) => word[0] === "#").join(" ");
    const result = await search(text, tags);
    const postIdArr = result.body.hits.hits.map((ele) => ele._id);
    let posts = await Post.find({ _id: { $in: postIdArr } });
    posts = posts.map((post) => post.getPostPreview());
    posts = await Promise.all(posts);
    return res.send(posts);
  } catch (err) {
    return res.status(500).send({ message: "Error in search" });
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
  console.log(err);
  return res.status(500).send({ message: "Some errors" });
});
