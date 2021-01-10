"use strict";
/** @type {typeof import('../../app/Models/User')} */
const User = require("../../app/Models/User");

const { test, trait, beforeEach } = use("Test/Suite")("Auth Controller");

trait("Test/ApiClient");

beforeEach(async () => {
  await User.query().where("id", ">", 0).delete();
});

test("Login Authentication", async ({ assert, client }) => {
  const pass = "pass@123";
  const user = await User.create({
    email: "usertest@mail.com",
    username: "User Test",
    password: pass,
  });

  const { status, body } = await client
    .post("/auth/login")
    .send({ email: user.email, password: pass })
    .end();
  assert.equal(status, 200, "Http Status Code");
  assert.equal(body.user.email, user.email, "Email Content");
  assert.equal(body.user.username, user.username, "Username Content");
});

test("Login Authentication - Fail", async ({ assert, client }) => {
  const pass = "pass@123";
  const user = await User.create({
    email: "usertest@mail.com",
    username: "User Test",
    password: pass,
  });

  const { status, body } = await client
    .post("/auth/login")
    .send({ email: user.email, password: pass + "fall" })
    .end();
  assert.equal(status, 200, "Http Status Code");
  assert.equal(body.error, true, "Error into Login");
  assert.equal(body.message, "Usuário ou senha incorretos", "User Incorrect");
});
