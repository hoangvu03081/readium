const request = require("supertest");

const app = require("../app");
const Post = require("../models/Post");
const { dbConfigPostTest, getJWT, posts } = require("./fixtures/db");

beforeEach(dbConfigPostTest);

test("Should create a post", async () => {
  request(app)
    .post("/posts")
    .set("Authorization", getJWT())
    .attach("coverImage", "tests/fixtures/homework.png")
    .field({
      title: "post title",
      content: "post content",
      text: "post text only content",
    })
    .expect(201);
});

test("Should get all posts pages in sorted date", async () => {
  let response = await request(app).get("/posts").send().expect(200);
  let next = 5;
  let count = 0;
  while (response.body.next) {
    const { posts } = response.body;

    expect(posts.length).toBe(5);
    expect(response.body.next).toBe(next);

    let maxDate = posts[0].publishDate;
    for (let i = 1; i < posts.length; i++) {
      expect(new Date(maxDate).getTime()).toBeGreaterThan(
        new Date(posts[i].publishDate).getTime()
      );
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
});

test(`Should get a post with id: ${posts[0]._id}`, async () => {});
