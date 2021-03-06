const request = require("supertest");

const app = require("../app");
const User = require("../models/User");
const { users, dbConfigPostTest: dbConfig, getJWT } = require("./fixtures/db");

beforeEach(dbConfig);

const { _id, email, biography, job, displayName, profileId } = users[0];
test("Should get my profile", async () => {
  const response = await request(app)
    .get("/users/profiles")
    .set("Authorization", getJWT())
    .send()
    .expect(200);

  let r_id;
  let {
    biography: rBiography,
    job: rJob,
    displayName: rDisplayName,
    profileId: rProfileId,
  } = response.body;

  expect(biography).toBe(rBiography);
  expect(job).toBe(rJob);
  expect(displayName).toBe(rDisplayName);
  expect(profileId).toBe(rProfileId);

  ({
    _id: r_id,
    biography: rBiography,
    job: rJob,
    displayName: rDisplayName,
    profileId: rProfileId,
  } = await User.findOne({ email }));

  expect(_id).toEqual(r_id);
  expect(biography).toBe(rBiography);
  expect(job).toBe(rJob);
  expect(displayName).toBe(rDisplayName);
  expect(profileId).toBe(rProfileId);
});

test("Should edit my profile", async () => {
  const response = await request(app)
    .patch("/users/profiles")
    .set("Authorization", getJWT())
    .send({
      displayName: "John Updated Doe",
      biography: "I'm being updated in Edit profile endpoint.",
      job: "Neet",
      facebook: "https://www.example.com",
      twitter: "https://www.example.com",
      instagram: "https://www.example.com",
      mail: "the@example.com",
    })
    .expect(200);

  let {
    email: rEmail,
    biography: rBiography,
    job: rJob,
    displayName: rDisplayName,
    profileId: rProfileId,
    facebook: rFacebook,
    twitter: rTwitter,
    instagram: rInstagram,
  } = response.body;

  expect(rEmail).toBe("the@example.com");
  expect(rBiography).toBe("I'm being updated in Edit profile endpoint.");
  expect(rJob).toBe("Neet");
  expect(rDisplayName).toBe("John Updated Doe");
  expect(rProfileId).toBe(profileId);
  expect(rFacebook).toBe("https://www.example.com");
  expect(rTwitter).toBe("https://www.example.com");
  expect(rInstagram).toBe("https://www.example.com");

  ({
    _id: r_id,
    email: rEmail,
    biography: rBiography,
    job: rJob,
    displayName: rDisplayName,
    profileId: rProfileId,
    facebook: rFacebook,
    twitter: rTwitter,
    instagram: rInstagram,
  } = await User.findOne({ email }));

  expect(r_id).toEqual(_id);
  expect(rEmail).toBe(email);
  expect(rBiography).toBe("I'm being updated in Edit profile endpoint.");
  expect(rJob).toBe("Neet");
  expect(rDisplayName).toBe("John Updated Doe");
  expect(rProfileId).toBe(profileId);
  expect(rFacebook).toBe("https://www.example.com");
  expect(rTwitter).toBe("https://www.example.com");
  expect(rInstagram).toBe("https://www.example.com");
});

test("Should not be able to edit if not authenticated", async () => {
  const response = await request(app)
    .patch("/users/profiles")
    .send({
      displayName: "John Updated Doe",
      biography: "I'm being updated in Edit profile endpoint.",
      job: "Neet",
      facebook: "https://www.example.com",
      twitter: "https://www.example.com",
      instagram: "https://www.example.com",
      mail: "the@example.com",
    })
    .expect(401);
});

test("Should upload avatar", async () => {
  let user = await User.findById(users[0]._id);
  await request(app)
    .post("/users/profiles")
    .attach("avatar", "tests/fixtures/homework.png")
    .set("Authorization", getJWT())
    .expect(200);

  user = await User.findById(users[0]._id);
  expect(user.avatar).not.toBeFalsy();
  expect(user.avatar).toEqual(expect.any(Buffer));
});
test("Should get avatar of user 1", async () => {
  const response = await request(app)
    .get(`/users/profiles/${users[0].profileId}`)
    .expect(200);
  const avatarUrl = response.body.avatar.slice(21);
  const avatar = await request(app).get(avatarUrl).expect(200);
  expect(avatar.body).toEqual(expect.any(Buffer));
});

test("Should not find cover image of user 1", async () => {
  const response = await request(app)
    .get(`/users/profiles/${users[0].profileId}`)
    .expect(200);
  expect(response.body.coverImage).toBeFalsy();

  await request(app)
    .get(`/users/profiles/cover-image/${users[0]._id}`)
    .expect(404);
});
