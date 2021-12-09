const request = require("supertest");

const app = require("../app");
const User = require("../models/User");
const {
  users,
  dbConfigOneUserTest: dbConfig,
  getJWT,
} = require("./fixtures/db");

beforeEach(dbConfig);

test("should register a new user", async () => {
  const response = await request(app)
    .post("/auth/register")
    .send({ email: "haiquytruong@gmail.com", password: "!johJWT@Example" })
    .expect(201);

  const user = await User.findOne({ email: "haiquytruong@gmail.com" });
  expect(user).toBeTruthy();
  expect(user.email).toBe("haiquytruong@gmail.com");
  expect(user.profileId).toBe("haiquytruong");
  expect(user.displayName).toBe("haiquytruong");
  expect(user.password).not.toBe("!johJWT@Example");
  expect(user.activated).toBe(false);
  expect(user.activationLink).toEqual(expect.any(String));
});

test("should not signup a new user with invalid email", async () => {
  const beforeCount = await User.find().countDocuments();

  await request(app)
    .post("/auth/register")
    .send({ email: "haiquytruong", password: "johnDoe" })
    .expect(400);
  await request(app)
    .post("/auth/register")
    .send({ email: "", password: "johnDoe" })
    .expect(400);
  await request(app)
    .post("/auth/register")
    .send({ password: "johnDoe" })
    .expect(400);

  const afterCount = await User.find().countDocuments();
  expect(afterCount - beforeCount).toBe(0);

  const users = await User.find({ email: "haiquytruong" });
  expect(users.length).toBe(0);
});

test("should not signup a new user with invalid password", async () => {
  const beforeCount = await User.find().countDocuments();

  await request(app)
    .post("/auth/register")
    .send({ email: "haiquytruong@gmail.com", password: "john" })
    .expect(400);
  await request(app)
    .post("/auth/register")
    .send({ email: "haiquytruong@gmail.com", password: "" })
    .expect(400);
  await request(app)
    .post("/auth/register")
    .send({ email: "haiquytruong@gmail.com" })
    .expect(400);

  const afterCount = await User.find().countDocuments();
  expect(afterCount - beforeCount).toBe(0);

  const users = await User.find({ email: "haiquytruong@gmail.com" });
  expect(users.length).toBe(0);
});

test("should not signup a new user with invalid email and password", async () => {
  const beforeCount = await User.find().countDocuments();
  await request(app).post("/auth/register").send().expect(400);
  const afterCount = await User.find().countDocuments();
  expect(afterCount - beforeCount).toBe(0);
});

test("should not signup a new user with the same email", async () => {
  const beforeCount = await User.find().countDocuments();

  const response = await request(app)
    .post("/auth/register")
    .send({ email: "john@example.com", password: "!johJWT@Example" })
    .expect(400);

  const afterCount = await User.find().countDocuments();
  expect(afterCount - beforeCount).toBe(0);

  // already created a user with email in setting up the testing env
  const count = await User.find({ email: "john@example.com" }).countDocuments();
  expect(count).toBe(1);
});

test("should create a different profile id", async () => {
  const response = await request(app)
    .post("/auth/register")
    .send({ email: "john@example2.com", password: "!johJWT@Example" })
    .expect(201);

  expect(response.body.user.profileId).toBe("john.1");
  const users = await User.find({ email: "john@example2.com" });
  expect(users.length).toBe(1);
  expect(users[0].displayName).toBe("john");
  expect(users[0].profileId).toBe("john.1");
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
  await request(app)
    .post("/auth")
    .send({ email: "users@email.com", password: users[0].password })
    .expect(404);
  await request(app)
    .post("/auth")
    .send({ email: users[0].email, password: "users[0].password" })
    .expect(400);
});

test("should be authenticated after login", async () => {
  let user = await User.findOne({
    email: users[0].email,
  });
  const tokensCountBefore = user.tokens.length;

  await request(app).get("/users/protected").send().expect(401);
  const response = await request(app)
    .post("/auth")
    .send({ email: users[0].email, password: users[0].password })
    .expect(200);

  user = await User.findOne({
    email: users[0].email,
  });
  const tokensCountAfter = user.tokens.length;

  expect(tokensCountAfter - tokensCountBefore).toBe(1);
  expect(user.tokens).toContain(response.body.token);

  await request(app)
    .get("/users/protected")
    .set("Authorization", response.body.token)
    .send()
    .expect(200);
});

test("should not have any tokens after logout all", async () => {
  await request(app)
    .get("/auth/logout-all")
    .set("Authorization", getJWT())
    .send()
    .expect(200);
  const user = await User.findById(users[0]._id);
  expect(user.tokens.length).toBe(0);
});

test("Should delete the token after logout", async () => {
  let user = await User.findById(users[0]._id);
  expect(user.tokens.length).toBe(1);

  const response = await request(app)
    .get("/auth/logout")
    .set("Authorization", getJWT())
    .send()
    .expect(200);

  user = await User.findById(users[0]._id);
  expect(user.tokens.length).toBe(0);
});

test("Should activate account if iv and id are correct", async () => {
  await request(app)
    .post("/auth/register")
    .send({ email: users[1].email, password: users[1].password })
    .expect(201);

  let user = await User.findOne({ email: users[1].email });
  expect(user.activated).toBe(false);

  const ivid = user.activationLink.split("?")[1];
  const iv = ivid.split("&")[0].split("=")[1];
  const id = ivid.split("&")[1].split("=")[1];

  const response = await request(app)
    .get("/auth/confirm")
    .query({ iv, id })
    .expect(200);

  user = await User.findOne({ email: users[1].email });
  expect(user.activated).toBe(true);
  expect(user.activationLink).toBeUndefined();
  expect(user.tokens.length).toBe(1);
  expect(user.tokens[0]).toEqual(expect.any(String));
  expect(response.body.token).toBe(user.tokens[0]);
});

test("Should not activate account if iv is incorrect", async () => {
  await request(app)
    .post("/auth/register")
    .send({ email: users[1].email, password: users[1].password })
    .expect(201);
  let user = await User.findOne({ email: users[1].email });

  const ivid = user.activationLink.split("?")[1];
  const id = ivid.split("&")[1].split("=")[1];

  await request(app).get("/auth/confirm").query({ id }).expect(400);

  await request(app)
    .get("/auth/confirm")
    .query({ iv: "Mlem wrong iv", id })
    .expect(400);

  user = await User.findOne({ email: users[1].email });
  expect(user.activated).toBe(false);
  expect(user.activationLink).toEqual(expect.any(String));
});

test("Should not activate account if id is incorrect", async () => {
  await request(app)
    .post("/auth/register")
    .send({ email: users[1].email, password: users[1].password })
    .expect(201);
  let user = await User.findOne({ email: users[1].email });

  const ivid = user.activationLink.split("?")[1];
  const iv = ivid.split("&")[0].split("=")[1];

  response = await request(app).get("/auth/confirm").query({ iv }).expect(400);

  response = await request(app)
    .get("/auth/confirm")
    .query({ iv, id: "Mlem wrong id" })
    .expect(400);

  user = await User.findOne({ email: users[1].email });
  expect(user.activated).toBe(false);
  expect(user.activationLink).toEqual(expect.any(String));
});

test("Should prompt if account is already activated", async () => {
  await request(app)
    .post("/auth/register")
    .send({ email: users[1].email, password: users[1].password })
    .expect(201);

  let user = await User.findOne({ email: users[1].email });

  const ivid = user.activationLink.split("?")[1];
  const iv = ivid.split("&")[0].split("=")[1];
  const id = ivid.split("&")[1].split("=")[1];

  await request(app).get("/auth/confirm").query({ iv, id }).expect(200);

  await request(app).get("/auth/confirm").query({ iv, id }).expect(400);

  user = await User.findOne({ email: users[1].email });
  expect(user.activated).toBe(true);
  expect(user.activationLink).toBeFalsy();
});

test("Should inform user to register an account in forgot password if email not found", async () => {
  await request(app)
    .post("/auth/forget")
    .send({ email: "randomemail@gmail.com" })
    .expect(404);
});

test("Should send back reset password link if correct email", async () => {
  await request(app)
    .post("/auth/forget")
    .send({ email: users[0].email })
    .expect(200);
  const user = await User.findOne({ email: users[0].email });
  expect(user.resetLink).toEqual(expect.any(String));
  expect(user.resetTimeout).toEqual(expect.any(Date));
});

test("Should reset password if user send correct iv, id, and password", async () => {
  await request(app)
    .post("/auth/forget")
    .send({ email: users[0].email })
    .expect(200);

  let user = await User.findOne({ email: users[0].email });
  expect(user.resetLink).toEqual(expect.any(String));
  expect(user.resetTimeout).toEqual(expect.any(Date));

  const ivid = user.resetLink.split("?")[1];
  const iv = ivid.split("&")[0].split("=")[1];
  const id = ivid.split("&")[1].split("=")[1];

  await request(app)
    .post("/auth/reset")
    .query({ iv, id })
    .send({ password: "testing123" })
    .expect(200);

  user = await User.findOne({ email: users[0].email });
  expect(user.resetLink).toBeFalsy();
  expect(user.resetTimeout).toBeFalsy();

  await request(app)
    .post("/auth")
    .send({ email: users[0].email, password: users[0].password })
    .expect(400);
});

test("Should not reset password if user send incorrect iv, id, or password", async () => {
  await request(app)
    .post("/auth/forget")
    .send({ email: users[0].email })
    .expect(200);
  let user = await User.findOne({ email: users[0].email });

  const ivid = user.resetLink.split("?")[1];
  const iv = ivid.split("&")[0].split("=")[1];
  const id = ivid.split("&")[1].split("=")[1];

  await request(app)
    .post("/auth/reset")
    .query({ id })
    .send({ password: "testing123" })
    .expect(400);

  await request(app)
    .post("/auth/reset")
    .query({ iv })
    .send({ password: "testing123" })
    .expect(400);

  await request(app).post("/auth/reset").query({ iv, id }).send().expect(400);

  await request(app)
    .post("/auth/reset")
    .query({ iv: "mlem iv", id })
    .send({ password: "testing123" })
    .expect(500);

  await request(app)
    .post("/auth/reset")
    .query({ iv, id: "mlem id" })
    .send({ password: "testing123" })
    .expect(500);

  await request(app)
    .post("/auth/reset")
    .query({ iv, id })
    .send({ password: "mlem" })
    .expect(400);

  user = await User.findOne({ email: users[0].email });
  expect(user.resetLink).toEqual(expect.any(String));
  expect(user.resetTimeout).toEqual(expect.any(Date));
});
