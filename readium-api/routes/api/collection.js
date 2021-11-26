/**
 ** Collection related routes
 */
const router = require("express").Router();

const User = require("../../models/User");
const Post = require("../../models/Post");
const collectionSchema = require("../../models/Collection");
const { authMiddleware } = require("../../utils/auth");

router.post("/", authMiddleware, async (req, res) => {
  // #swagger.tags = ['Collection']
  // #swagger.summary = 'Create new collection'
  /*
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            properties: {
              name: {
                type: 'string',
                default: 'collection name',
              }
            }
          }  
        }
      }
    }
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  const { name } = req.body;
  const { responseObj } = res;
  if (!name) {
    responseObj.messages = ["Please provides the collection's name"];
    return res.status(400).send(responseObj);
  }

  const existed = req.user.collections.some(
    (collection) => collection.name === name
  );
  if (existed) {
    responseObj.messages = ["You have already created this collection!"];
    return res.status(400).send(responseObj);
  }
  const collection = { name, posts: [] };
  req.user.collections.push(collection);
  await req.user.save();
  return res.send(collection);
});

// didn't test
router.post("/posts", authMiddleware, async (req, res) => {
  // #swagger.tags = ['Collection']
  // #swagger.summary = 'Add post to collection'
  /*
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/PostToCollection"
          }  
        }
      }
    }
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  const { postId, collectionName } = req.body;
  const { responseObj } = res;

  if (!postId) responseObj.messages.push("Missing post id");
  if (!collectionName) responseObj.messages.push("Missing collection's name");
  if (!responseObj.messages.length !== 0) {
    return res.status(400).send(responseObj);
  }

  const post = await Post.findById(postId);
  if (!post) {
    responseObj.messages = ["Invalid post id"];
    return res.status(404).send(responseObj);
  }

  const collection = req.user.collections.find(
    (col) => col.name === collectionName
  );
  if (!collection) {
    responseObj.messages = ["Collection name is not valid."];
    return res.status(404).send(responseObj);
  }

  if (collection.some((post) => post._id.toString() === postId)) {
    responseObj.messages = ["Post is already added in the collection"];
    return res.status(400).send(responseObj);
  }

  // found post & found collections -> valid id & valid collection name -> add to collection
  collection.posts.push(postId);

  await req.user.save();

  return res.send(req.user.collections);
});

// didn't test
router.delete("/posts", authMiddleware, async (req, res) => {
  // #swagger.tags = ['Collection']
  // #swagger.summary = 'Delete post from collection'
  /*
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/PostToCollection"
          }  
        }
      }
    }
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  const { postId, collectionName } = req.body;
  const { responseObj } = res;

  if (!postId) responseObj.messages.push("Missing post id");
  if (!collectionName) responseObj.messages.push("Missing collection's name");
  if (!responseObj.messages.length !== 0) {
    return res.status(400).send(responseObj);
  }

  const post = await Post.findById(postId);
  if (!post) {
    responseObj.messages = ["Invalid post id"];
    return res.status(404).send(responseObj);
  }

  const collection = req.user.collections.find(
    (col) => col.name === collectionName
  );
  if (!collection) {
    responseObj.messages = ["Collection name is not valid."];
    return res.status(404).send(responseObj);
  }

  const postIndex = collection.findIndex(
    (post) => post._id.toString() === postId
  );
  if (postIndex === -1) {
    responseObj.messages = ["Post is not in the collection to be removed"];
    return res.status(400).send(responseObj);
  }

  // found post & found collections -> valid id & valid collection name -> add to collection
  collection.posts.splice(postIndex, 1);
  await req.user.save();

  return res.send(req.user.collections);
});

module.exports = router;
