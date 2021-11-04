const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  fullname: {
    type: String,
    required: true,
  },
  biography: String,
  job: String,
  avatar: Buffer,
  followers: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  followings: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  notifications: [
    // limit to 50 notifications, no longer than 3 months
    {
      user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
      },
      content: String,
    },
  ],
  activation_link: String,
  activated: {
    type: Boolean,
    required: true,
  },
});

const saltRounds = 10;

// hash user password pre save
userSchema.pre("save", async function () {
  if (this.password)
    this.password = await bcrypt.hash(this.password, saltRounds);
});

module.exports = mongoose.model("User", userSchema);
