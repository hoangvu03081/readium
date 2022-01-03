const router = require("express").Router();

const Post = require("../../models/Post");
const Collection = require("../../models/Collection");
const { authMiddleware, getPostCoverImageUrl } = require("../../utils");

const checkPostAndCollectionExist = async (req, res, next) => {
  try {
    const { postId, collectionId } = req.body;

    if (!postId) {
      return res.status(400).send({ message: "Missing post id" });
    }
    if (!collectionId) {
      return res.status(400).send({ message: "Missing collection's id" });
    }

    const post = await Post.findById(postId);
    if (!post || !post.isPublished) {
      return res.status(404).send({ message: "Invalid post id" });
    }

    const cId = req.user.collections.find(
      (cId) => cId.toString() === collectionId
    );
    if (!cId) {
      return res
        .status(404)
        .send({ message: "User doesn't have this collection." });
    }
    const collection = await Collection.findById(cId);

    req.post = post;
    req.collection = collection;
    return next();
  } catch (err) {
    return res.status(500).send({
      message: "Some error occur when check post and collection exist",
    });
  }
};

router.get("/", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['Collection']
    #swagger.summary = 'get all collections of me'
    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  try {
    let collections = await Collection.find({
      user: req.user._id,
    }).populate("posts", { _id: 1 });

    collections = collections.map((collection) => {
      collection = collection.getCollection();
      collection.posts.map((post) => {
        post.id = post._id;
        post.coverImage = getPostCoverImageUrl(post.id);
        delete post._id;
        return post;
      });
      return collection;
    });
    return res.send(collections);
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Some errors occurred in get collections" });
  }
});

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
    return res.send(collection.getCollection());
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Something went wrong when create a new collection" });
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

      if (collection.posts.some((pId) => pId.toString() === postId)) {
        return res
          .status(400)
          .send({ message: "Post is already added in the collection" });
      }

      collection.posts.push(postId);
      await collection.save();
      return res.send();
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Something went wrong when add post to collection" });
    }
  }
);

router.put("/:collectionId/name", authMiddleware, async (req, res) => {
  /*
    #swagger.tags = ['Collection']
    #swagger.summary = 'Edit collection name'
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
    const { collectionId } = req.params;
    if (!name) {
      return res
        .status(400)
        .send({ message: "Please provide name to edit collection's name" });
    }
    await req.user.populate("collections", { name: 1 });
    if (
      req.user.collections.some(
        (collection) =>
          collection._id.toString() !== collectionId && collection.name === name
      )
    ) {
      return res.status(400).send({
        message:
          "This name is already used by other collection, please input a new name.",
      });
    }
    const collection = await Collection.findById(collectionId);
    if (collection.name === name) {
      return res.send();
    }
    collection.name = name;
    await collection.save();
    return res.send();
  } catch (err) {
    return res
      .status(500)
      .send({ message: "some errors occurred in edit collection name" });
  }
});

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
        (pId) => pId.toString() === postId
      );
      if (postIndex === -1) {
        return res
          .status(404)
          .send({ message: "Post is not in the collection to be removed!" });
      }

      collection.posts.splice(postIndex, 1);
      await collection.save();
      return res.send();
    } catch (err) {
      return res.status(500).send({
        message: "Something went wrong when delete post from collection",
      });
    }
  }
);

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
    if (!collection) {
      return res.status(404).send({ message: "Collection not found" });
    }
    if (collection.user.toString() !== req.user._id.toString()) {
      return res
        .status(400)
        .send({ message: "You do not own this collection to delete" });
    }

    const cId = req.user.collections.findIndex(
      (cId) => cId.toString() === collectionId
    );

    if (cId !== -1) {
      req.user.collections.splice(cId, 1);
      await req.user.save();
    }
    collection = await Collection.deleteOne({ _id: collectionId });
    return res.send();
  } catch (err) {
    return res.send({
      message: "Something went wrong when deleting a collection",
    });
  }
});

module.exports = router;
