const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { serverUrl } = require("../config/url");
const { getAvatarUrl, getUserCoverImageUrl } = require("../utils");

const {
  model,
  Schema,
  SchemaTypes: { ObjectId },
} = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  profileId: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  activated: { type: Boolean, default: false },
  password: String,
  biography: String,
  job: String,
  avatar: Buffer,
  coverImage: Buffer,
  followers: [{ type: ObjectId, ref: "User" }],
  followings: [{ type: ObjectId, ref: "User" }],
  notifications: [{ type: ObjectId, ref: "Notification", required: true }],
  collections: [{ type: ObjectId, ref: "Collection", required: true }],
  liked: [{ type: ObjectId, ref: "Post", required: true }],
  tokens: [String],
  activationLink: String,
  resetLink: String,
  resetTimeout: Date,
  facebook: String,
  twitter: String,
  instagram: String,
  contactEmail: String,
});

userSchema.methods.getPublicProfile = function () {
  const user = this;
  const userObject = user.toObject();

  userObject.id = userObject._id;
  userObject.avatar = getAvatarUrl(userObject.id);
  userObject.followers = userObject.followers.length;
  userObject.followings = userObject.followings.length;
  if (userObject.coverImage) {
    userObject.coverImage = getUserCoverImageUrl(userObject.id);
  }

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
  return userObject;
};

const saltRounds = 10;

userSchema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, saltRounds);
};

module.exports = model("User", userSchema);
