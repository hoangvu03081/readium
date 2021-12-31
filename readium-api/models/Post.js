const { ObjectId: mObjectId } = require("mongodb");
const mongoose = require("mongoose");
const {
  getAvatarUrl,
  getPostCoverImageUrl,
  getDraftCoverImageUrl,
  getUserCoverImageUrl,
  streamToString,
} = require("../utils");
const { getBucket } = require("../config/db");

const {
  model,
  Schema,
  SchemaTypes: { ObjectId },
} = mongoose;

function publishRqFnc() {
  return this.isPublished;
}

const requiredArr = [publishRqFnc, "This field is required when publish"];

const postSchema = new Schema({
  title: {
    type: String,
    default: "",
    required: requiredArr,
    maxlength: [100, "Max 100, get {VALUE}"],
  },
  textEditorContent: ObjectId,
  // textEditorContent: {
  // type: String,
  // default: '{ "ops": [] }',
  // required: requiredArr,
  // },
  author: { type: ObjectId, ref: "User", required: true },
  coverImage: { type: Buffer, required: requiredArr },
  content: { type: String, default: "" },
  publishDate: { type: Date, required: requiredArr },
  publishedPost: { type: ObjectId, ref: "Post" },
  isPublished: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  likes: [{ type: ObjectId, required: true, ref: "User" }],
  comments: [{ type: ObjectId, ref: "Comment", required: true }],
  textConnection: [
    {
      toPost: {
        type: ObjectId,
        ref: "Post",
      },
      score: Number,
    },
  ],
  duration: { type: Number, default: 0 },
  tags: [String],
  summary: String,
  description: { type: String, default: "" },
});

postSchema.methods.getSearch = function () {
  const post = this.toObject();
  post.id = post._id;

  delete post._id;
};

postSchema.methods.getElastic = function () {
  const post = this.toObject();
  post.author = post.author.toString();
  if (post.publishDate) post.publishDate = post.publishDate.getTime();
  if (post.publishedPost) post.publishedPost = post.publishedPost.toString();
  post.likes = post.likes.map((userId) => userId.toString());
  post.comments = post.comments.map((commentId) => commentId.toString());
  post.textConnection = post.textConnection.map((con) => {
    con.toPost = con.toPost.toString();
    return con;
  });

  delete post.__v;
  delete post._id;
  delete post.coverImage;
  delete post.textEditorContent;
  return post;
};

postSchema.methods.getPostPreview = async function () {
  await this.populate("author", { displayName: 1, profileId: 1 });
  const postObject = this.toObject();

  postObject.id = postObject._id;
  postObject.likes = postObject.likes.length;
  postObject.comments = postObject.comments.length;

  if (postObject.coverImage) {
    if (postObject.isPublished)
      postObject.coverImage = getPostCoverImageUrl(postObject.id);
    else postObject.coverImage = getDraftCoverImageUrl(postObject.id);
  }
  postObject.author.id = postObject.author._id.toString();
  postObject.author.avatar = getAvatarUrl(postObject.author.id);

  delete postObject.author._id;
  delete postObject.__v;
  delete postObject._id;
  delete postObject.textEditorContent;
  delete postObject.textConnection;

  return postObject;
};

postSchema.methods.getPostDetail = async function () {
  const bucket = getBucket();
  let textEditorContent = "";
  if (this.textEditorContent) {
    const stream = bucket.openDownloadStream(this.textEditorContent);
    textEditorContent = await streamToString(stream);
  }

  await this.populate("author", {
    displayName: 1,
    followers: 1,
    followings: 1,
    profileId: 1,
  });
  const postObject = this.toObject();

  postObject.id = postObject._id.toString();
  postObject.textEditorContent = textEditorContent;
  if (postObject.coverImage) {
    if (postObject.isPublished)
      postObject.coverImage = getPostCoverImageUrl(postObject.id);
    else postObject.coverImage = getDraftCoverImageUrl(postObject.id);
  }
  postObject.author.avatar = getAvatarUrl(postObject.author._id);
  postObject.author.followers = postObject.author.followers.length;
  postObject.author.followings = postObject.author.followings.length;

  delete postObject.author._id;
  delete postObject.__v;
  delete postObject._id;

  return postObject;
};

postSchema.methods.toJSON = function () {
  const post = this.toObject();
  if (post.author._id && post.author.profileId) {
    const userObject = post.author;
    userObject.id = userObject._id.toString();
    userObject.avatar = getAvatarUrl(userObject.id);
    if (userObject.coverImage) {
      userObject.coverImage = getUserCoverImageUrl(userObject.id);
    }
    userObject.followers = userObject.followers.length;
    userObject.followings = userObject.followings.length;

    delete userObject.email;
    delete userObject.activated;
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.notifications;
    delete userObject.activationLink;
    delete userObject.resetLink;
    delete userObject.resetTimeout;
    delete userObject.__v;
    delete userObject._id;
    delete userObject.liked;
  }
  delete post.coverImage;
  delete post.__v;
  return post;
};

module.exports = model("Post", postSchema);
