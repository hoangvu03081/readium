const request = require("supertest");

const app = require("../app");
const User = require("../models/User");
const { users, dbConfigPostTest: dbConfig, getJWT } = require("./fixtures/db");

beforeEach(dbConfig);

test("Should have number of followers and followings of user 1", async () => {
  const response = await request(app)
    .get(`/users/profiles/${users[0].profileId}`)
    .expect(200);
  const user = await User.findById(users[0]._id);
  expect(response.body.followers).toBe(user.followers.length);
  expect(response.body.followings).toBe(user.followings.length);
});

test("Should return true if users[0] is following users[4]", async () => {
  const response = await request(app)
    .get(`/users/follow/${users[4]._id}`)
    .set("Authorization", getJWT())
    .send()
    .expect(200);
  expect(response.body.is_followed).toBe(true);
});

test("Should follow users[1] from users[0]", async () => {
  let user = await User.findById(users[0]._id);
  expect(user.followings).not.toContainEqual(users[1]._id);

  await request(app)
    .post(`/users/follow/${users[1]._id}`)
    .set("Authorization", getJWT())
    .send()
    .expect(200);
  user = await User.findById(users[0]._id);
  expect(user.followings).toContainEqual(users[1]._id);
});

test("Should unfollow users[3] from users[0]", async () => {
  let user = await User.findById(users[0]._id);
  expect(user.followings).toContainEqual(users[3]._id);

  await request(app)
    .post(`/users/follow/${users[3]._id}`)
    .set("Authorization", getJWT())
    .send()
    .expect(200);
  user = await User.findById(users[0]._id);
  expect(user.followings).not.toContainEqual(users[3]._id);
});
