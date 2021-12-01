const request = require("supertest");

const app = require("../app");
const User = require("../models/User");
const { dbConfig, getJWT } = require("./fixtures/db");

beforeEach(dbConfig);

// Should create a post
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

test("Should get all posts pages", async () => {
  let response = await request(app).get("/posts").send().expect(200);
  let next = 5;
  while (response.body.next) {
    expect(response.body.posts.length).toBe(5);
    expect(response.body.next).toBe(next);
    response = await request(app)
      .get("/posts")
      .query({ skip: next })
      .send()
      .expect(200);
    next += 5;
  }
  expect(response.body.posts.length).toBe(0);
  expect(response.body.next).toBeUndefined();
});
