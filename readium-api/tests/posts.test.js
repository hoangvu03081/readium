const request = require("supertest");

const app = require("../app");
const Post = require("../models/Post");
const { dbConfigPostTest: dbConfig, getJWT, posts } = require("./fixtures/db");

beforeEach(dbConfig);

test("Should get all posts pages in sorted date", async () => {
  let response = await request(app).get("/posts").send().expect(200);
  let next = 5;
  let count = 0;
  while (response.body.next) {
    const { posts } = response.body;

    expect(posts.length).toBe(5);
    expect(response.body.next).toBe(next);

    let maxDate = new Date();
    for (let i = 0; i < posts.length; i++) {
      expect(posts[i].isPublished).toBe(true);
      expect(new Date(maxDate).getTime()).toBeGreaterThan(
        new Date(posts[i].publishDate).getTime()
      );
      expect(posts[i].coverImage).toBeFalsy();
      const post = await Post.findById(posts[i]._id);
      expect(posts[i].likes).toBe(post.likes.length);
      expect(posts[i].comments).toBe(post.comments.length);
      expect(posts[i].views).toBe(post.views);
      maxDate = posts[i].publishDate;
    }

    response = await request(app)
      .get("/posts")
      .query({ skip: next })
      .send()
      .expect(200);
    next += 5;
    count++;
  }
  expect(response.body.posts.length).toBe(0);
  expect(response.body.next).toBeUndefined();
  expect(count).toBe(3);
});

test("Should get a popular post", async () => {
  const response = await request(app).get("/posts/popular").send().expect(200);
  expect(response.body).not.toBeFalsy();
  expect(response.body.isPublished).toBe(true);
});

test(`Should get a post with id: ${posts[0]._id}`, async () => {
  let post = await Post.findById(posts[0]._id);
  const viewBefore = post.views;
  const response = await request(app)
    .get(`/posts/${posts[0]._id}`)
    .send()
    .expect(200);

  post = await Post.findById(posts[0]._id);
  const viewAfter = post.views;

  expect(viewAfter - viewBefore).toBe(1);
});

test("Should get post cover-image", async () => {});

test("Should not get post cover-image if that post is not published", async () => {});

test("Should not get an unpublish post", async () => {
  request(app).get(`/posts/${posts[1]._id}`).send().expect(404);
});

test("Should initilize a post", async () => {
  await request(app)
    .post("/posts")
    .set("Authorization", getJWT())
    .send({
      title: "test post title is unique",
    })
    .expect(201);

  const count = await Post.find({
    title: "test post title is unique",
  }).countDocuments();
  expect(count).toBe(1);
});

test("Should update a post correctly", async () => {});

test("Should publish a post", async () => {});

test("Should unpublish a post", async () => {});
