const fs = require("fs");
const request = require("supertest");
const mongoose = require("mongoose");
const { createAvatar } = require("@dicebear/avatars");
const style = require("@dicebear/avatars-initials-sprites");
const sharp = require("sharp");

const app = require("../../app");
const User = require("../../models/User");
const Post = require("../../models/Post");

const users = require("./data/users");
const posts = require("./data/posts");

let jwt;

const getJWT = () => jwt;

const dbConfigUserTest = async () => {
  await User.deleteMany();

  for (let u of users) {
    const user = new User(u);
    await user.hashPassword();
    await user.save();
  }

  const response = await request(app)
    .post("/auth")
    .send({ email: users[0].email, password: users[0].password })
    .expect(200);

  jwt = response.body.token;
};

const dbConfigOneUserTest = async () => {
  await User.deleteMany();

  // avatar
  const avatarSvg = createAvatar(style, {
    seed: users[0].displayName,
  });
  const avatar = await sharp(Buffer.from(avatarSvg, "utf-8"), {
    density: 50000,
  })
    .resize({ width: 200, fit: sharp.fit.contain })
    .png()
    .toBuffer();

  const user = new User({ ...users[0], avatar });
  await user.hashPassword();
  await user.save();

  const response = await request(app)
    .post("/auth")
    .send({ email: users[0].email, password: users[0].password })
    .expect(200);

  jwt = response.body.token;
};

const dbConfigPostTest = async () => {
  await User.deleteMany();
  await Post.deleteMany();

  const coverImage = fs.readFileSync("tests/fixtures/homework.png");

  for (let i = 0; i < users.length; i++) {
    // avatar
    const avatarSvg = createAvatar(style, {
      seed: users[i].displayName,
    });
    const avatar = await sharp(Buffer.from(avatarSvg, "utf-8"), {
      density: 50000,
    })
      .resize({ width: 200, fit: sharp.fit.contain })
      .png()
      .toBuffer();

    const user = new User({ ...users[i], avatar });
    await user.hashPassword();
    await user.save();
  }

  for (let i = 0; i < posts.length; i++) {
    const post = new Post({ ...posts[i], coverImage });
    await post.save();
  }

  const response = await request(app)
    .post("/auth")
    .send({ email: users[0].email, password: users[0].password })
    .expect(200);

  jwt = response.body.token;
};

module.exports = {
  users,
  posts,
  dbConfigUserTest,
  dbConfigOneUserTest,
  dbConfigPostTest,
  getJWT,
};
