'use strict'
/** @type {typeof import('../../app/Models/User')} */
const User = require("../../app/Models/User");
/** @type {typeof import('../../app/Models/Skill')} */
const Skill = require("../../app/Models/Skill");
/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

const { test ,trait,beforeEach} = use('Test/Suite')('Skill')
trait("Test/ApiClient");

beforeEach(async () => {
  await User.query().where("id", ">", 0).delete();
  await Skill.query().where("id", ">", 0).delete();
});

test("List Skills", async ({ assert, client }) => {

  await Factory.model("App/Models/Skill").createMany(15);

  const userData = {
    email: "user01@mail.com",
    username: "User Test",
    password: "pass@123",
  };
  const user = await User.create(userData);
  const {
    body: {
      access_token: { token, type },
    },
  } = await client
    .post("/auth/login")
    .send({ email: user.email, password: userData.password })
    .end();

   const { status, body } = await client
  .get("/api/v1/skills")
  .send({})
  .header("Authorization", `${type} ${token}`)
  .end();
  assert.equal(status, 200, "Http Status Code");
  assert.isArray(body, "Not is Array");
  assert.equal(body.length, 15, "Count List");
});
