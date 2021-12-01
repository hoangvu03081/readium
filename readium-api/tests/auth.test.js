const request = require("supertest");

const app = require("../app");
const User = require("../models/User");
const { users, dbConfig, getJWT } = require("./fixtures/db");

beforeEach(dbConfig);

test("should signup a new user", async () => {
  const response = await request(app)
    .post("/auth/register")
    .send({ email: "haiquytruong@gmail.com", password: "!johJWT@Example" })
    .expect(201);

  expect(response.body.message).toBe(
    "Please activate your account with the link sent to your email!"
  );
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
  expect(user.email).toBe("haiquytruong@gmail.com");
  expect(user.profileId).toBe("haiquytruong");
  expect(user.displayName).toBe("haiquytruong");
  expect(user.password).not.toBe("!johJWT@Example");
});

test("should not signup a new user with invalid email", async () => {
  const response = await request(app)
    .post("/auth/register")
    .send({ email: "haiquytruong", password: "johnDoe" })
    .expect(400);
  const response2 = await request(app)
    .post("/auth/register")
    .send({ email: "", password: "johnDoe" })
    .expect(400);
  expect(response.body.message).toEqual(
    expect.stringMatching(/email must not be empty!|Your email is not valid/)
  );
  expect(response2.body.message).toEqual(
    expect.stringMatching(/email must not be empty!|Your email is not valid/)
  );
});

test("should not signup a new user with invalid password", async () => {
  const response = await request(app)
    .post("/auth/register")
    .send({ email: "haiquytruong@gmail.com", password: "john" })
    .expect(400);
  const response2 = await request(app)
    .post("/auth/register")
    .send({ email: "haiquytruong@gmail.com", password: "" })
    .expect(400);
  expect(response.body.message).toEqual(
    expect.stringMatching(
      /password must not be empty!|Your password must be greater than 6 characters/
    )
  );
  expect(response2.body.message).toEqual(
    expect.stringMatching(
      /password must not be empty!|Your password must be greater than 6 characters/
    )
  );
});

test("should not signup a new user with the same email", async () => {
  const response = await request(app)
    .post("/auth/register")
    .send({ email: "john@example.com", password: "!johJWT@Example" })
    .expect(400);

  expect(response.body.message).toBe("Your email is already used");

  const count = await User.find({ email: "john@example.com" }).countDocuments();
  expect(count).toBe(1);
});

test("should create a different profile id", async () => {
  const response = await request(app)
    .post("/auth/register")
    .send({ email: "john@example2.com", password: "!johJWT@Example" })
    .expect(201);

  expect(response.body.user.profileId).toBe("john1");
  const users = await User.find({ email: "john@example2.com" });
  expect(users.length).toBe(1);
  expect(users[0].displayName).toBe("john");
});

test("Should login user with correct credentials", async () => {
  const response = await request(app)
    .post("/auth")
    .send({ email: users[0].email, password: users[0].password })
    .expect(200);
  const user = await User.findById(users[0]._id);
  expect(response.body.token).toBe(user.tokens[1]);
});

test("Should not login user with wrong credentails", async () => {
  await request(app).post("/auth").send().expect(400);
  await request(app)
    .post("/auth")
    .send({ password: users[0].password })
    .expect(400);
  await request(app).post("/auth").send({ email: users[0].email }).expect(400);
  const response = await request(app)
    .post("/auth")
    .send({ email: "users@email.com", password: users[0].password })
    .expect(404);
  await request(app)
    .post("/auth")
    .send({ email: users[0].email, password: "users[0].password" })
    .expect(400);
});

test("should be authenticated after login", async () => {
  await request(app).get("/users/protected").send().expect(401);
  const response = await request(app)
    .post("/auth")
    .send({ email: users[0].email, password: users[0].password })
    .expect(200);
  await request(app)
    .get("/users/protected")
    .set("Authorization", getJWT())
    .send()
    .expect(200);
});

test("should not have any tokens after logout", async () => {
  await request(app)
    .get("/auth/logout-all")
    .set("Authorization", getJWT())
    .send()
    .expect(200);
  const user = await User.findById(users[0]._id);
  expect(user.tokens.length).toBe(0);
});
