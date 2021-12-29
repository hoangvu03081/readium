const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { clientUrl } = require("../config/url");
const { getAvatarUrl, getUserCoverImageUrl, encrypt } = require("../utils");

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
  job: { type: String, default: "" },
  password: String,
  biography: String,
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

userSchema.methods.sendResetLink = async function () {
  const user = this;
  if (user.resetLink) return;
  const due = new Date();
  due.setDate(due.getDate() + 7);

  const [iv, hashedId] = encrypt({ due, id: user._id.toString() });
  const resetLink = `${clientUrl}/auth/reset?iv=${iv}&id=${hashedId}`;

  user.resetLink = resetLink;
  user.resetTimeout = due;

  await user.save();
};

const saltRounds = 10;
userSchema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, saltRounds);
};

module.exports = model("User", userSchema);
