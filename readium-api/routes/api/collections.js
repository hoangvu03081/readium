/**
 ** Collection related routes
 */
const router = require("express").Router();

const Post = require("../../models/Post");
const Collection = require("../../models/Collection");
const { authMiddleware } = require("../../utils");

const checkPostAndCollectionExist = async (req, res, next) => {
  try {
    const { postId, collectionName } = req.body;

    if (!postId) {
      return res.status(400).send({ message: "Missing post id" });
    }
    if (!collectionName) {
      return res.status(400).send({ message: "Missing collection's name" });
    }

    const post = await Post.findById(postId);
    if (!post || !post.isPublished) {
      return res.status(404).send({ message: "Invalid post id" });
    }

    const collection = await Collection.findOne({
      name: collectionName,
      user: req.user._id,
    });
    if (!collection) {
      return res
        .status(404)
        .send({ message: "User doesn't have this collection." });
    }

    req.post = post;
    req.collection = collection;
    return next();
  } catch (err) {
    return res.status(500).send({
      message: "Some error occur when check post and collection exist",
    });
  }
};

router.post("/", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['Collection']
    #swagger.summary = 'Create new collection'
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
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .send({ message: "Please provides the collection's name" });
    }

    const existed = await Collection.findOne({ name, user: req.user._id });
    if (existed) {
      return res
        .status(400)
        .send({ message: "You have already created this collection!" });
    }

    const collection = new Collection({ user: req.user._id, name, posts: [] });
    req.user.collections.push(collection._id);

    await collection.save();
    await req.user.save();
    return res.send(collection);
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Something went wrong when create a new collection" });
  }
});

router.delete("/:collectionId", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['Collection']
    #swagger.summary = 'Delete a collection'
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  try {
    const { collectionId } = req.params;
    let collection = await Collection.findById(collectionId);
    if (collection.user.toString() !== req.user._id.toString()) {
      return res
        .status(400)
        .send({ message: "You do not own this collection to delete" });
    }

    collection = await Collection.deleteOne({ _id: collectionId });
    return res.send(collection);
  } catch (err) {
    return res.send({
      message: "Something went wrong when deleting a collection",
    });
  }
});

router.post(
  "/posts",
  authMiddleware,
  checkPostAndCollectionExist,
  async (req, res) => {
    /*
      #swagger.tags = ['Collection']
      #swagger.summary = 'Add post to collection'
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
    try {
      const { postId } = req.body;
      const { collection } = req;

      if (collection.posts.some((post) => post._id.toString() === postId)) {
        return res
          .status(400)
          .send({ message: "Post is already added in the collection" });
      }

      collection.posts.push(postId);
      await collection.save();
      return res.send(collection);
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Something went wrong when add post to collection" });
    }
  }
);

router.delete(
  "/posts",
  authMiddleware,
  checkPostAndCollectionExist,
  async (req, res) => {
    /*
      #swagger.tags = ['Collection']
      #swagger.summary = 'Delete post from collection'
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
    try {
      const { postId } = req.body;
      const { collection } = req;

      const postIndex = collection.posts.findIndex(
        (post) => post._id.toString() === postId
      );
      if (postIndex === -1) {
        return res
          .status(404)
          .send({ message: "Post is not in the collection to be removed!" });
      }

      collection.posts.splice(postIndex, 1);
      await collection.save();
      return res.send(collection);
    } catch (err) {
      return res.status(500).send({
        message: "Something went wrong when delete post from collection",
      });
    }
  }
);

module.exports = router;
