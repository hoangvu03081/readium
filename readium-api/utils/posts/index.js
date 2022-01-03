const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const Collection = require("../../models/Collection");
const { deletePost } = require("../elasticsearch");

const removePostDependenciesMongoose = async (post, cb) => {
  const id = post._id.toString();

  // unref if exist
  const draftOfPost = await Post.find({
    publishedPost: id,
  });
  if (draftOfPost.length) {
    for (let draft of draftOfPost) {
      draft.publishedPost = undefined;
      await draft.save();
    }
  }

  // remove this post in user liked list
  for (const user of post.likes) {
    const pId = user.liked.findIndex((pId) => pId.toString() === id);
    if (pId !== -1) {
      user.liked.splice(pId, 1);
      await user.save();
    }
  }

  // remove all comments of this post
  await Comment.deleteMany({ post: id });

  // remove this post in all collection
  const collections = await Collection.find({ posts: id });
  for (const collection of collections) {
    const pId = collection.posts.findIndex((pId) => pId === id);
    if (pId !== -1) {
      collection.posts.splice(pId, 1);
      await collection.save();
    }
  }

  // remove textConnection
  const posts = await Post.find({ "textConnection.toPost": id });
  for (const post of posts) {
    post.textConnection.splice(
      post.textConnection.findIndex((obj) => obj.toPost.toString() === id),
      1
    );
    await post.save();
  }

  await deletePost(id);
  await cb(id);

  post = await post.getPostPreview();
  return post;
};
const deletePostMongoose = (post) =>
  removePostDependenciesMongoose(post, async (id) => {
    await Post.deleteOne({ _id: id });
  });

const unpublishPostMongoose = (post) =>
  removePostDependenciesMongoose(post, async () => {
    post.publishDate = undefined;
    post.isPublished = false;
    post.likes = [];
    await post.save();
  });

module.exports = { deletePostMongoose, unpublishPostMongoose };
