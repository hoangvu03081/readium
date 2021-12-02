const fs = require("fs");
const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../../app");
const User = require("../../models/User");
const Post = require("../../models/Post");

const users = require("./data/users");
const posts = require("./data/posts");

let jwt;

const getJWT = () => jwt;

const dbConfigOneUserTest = async () => {
  await User.deleteMany();
  
  user = new User(users[0]);
  await user.hashPassword();
  await user.save();

  const response = await request(app)
    .post("/auth")
    .send({ email: users[0].email, password: users[0].password })
    .expect(200);

  jwt = response.body.token;
};

const dbConfig = async () => {
  await User.deleteMany();
  await Post.deleteMany();

  const coverImage = fs.readFileSync("tests/fixtures/homework.png");

  for (let i = 0; i < users.length; i++) {
    const user = new User(users[i]);
    await user.hashPassword();
    await user.save();

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
  dbConfigOneUserTest,
  dbConfig,
  getJWT,
};
