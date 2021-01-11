"use strict";
/** @type {typeof import('../../app/Models/User')} */
const User = require("../../app/Models/User");
/** @type {typeof import('../../app/Models/Candidate')} */
const Candidate = require("../../app/Models/Candidate");
/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const { test, trait, beforeEach } = use("Test/Suite")("Candidate Controller");
trait("Test/ApiClient");

beforeEach(async () => {
  await User.query().where("id", ">", 0).delete();
});

test("Create Candidate", async ({ assert, client }) => {
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

  const dataCandidates = await Factory.model("App/Models/Candidate").make();
  await Factory.model("App/Models/Skill").createMany(5);
  const { status, body } = await client
    .post("/api/v1/candidates")
    .send({
      ...dataCandidates.toJSON(),
      skills: [{ id: 1 }, { id: 2 }, { id: 3 }],
    })
    .header("Authorization", `${type} ${token}`)
    .end();
  assert.equal(status, 200, "Http Status ");
  Object.keys(dataCandidates.toJSON()).forEach((key) => {
    assert.equal(body[key], dataCandidates[key], `Validation [${key}] field`);
  });
});

test("Update Candidate", async ({ assert, client }) => {
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

  await Factory.model("App/Models/Skill").createMany(5);
  const candidateModel = await Factory.model("App/Models/Candidate").create();
  await candidateModel.skills().attach([1, 2, 3]);
  const dataCandidates = await Factory.model("App/Models/Candidate").make();
  const { status, body } = await client
    .put("/api/v1/candidates/"+candidateModel.id)
    .send({ ...dataCandidates.toJSON(), skills: [{ id: 1 }] })
    .header("Authorization", `${type} ${token}`)
    .end();

  assert.equal(status, 200, "Http Status ");
  assert.equal(1,body.skills.length, "Skiils Equal")
  Object.keys(dataCandidates.toJSON()).forEach((key) => {
    assert.equal(body[key], dataCandidates[key], `Validation [${key}] field`);
  });
});

test("Show Candidate", async ({ assert, client }) => {
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

  await Factory.model("App/Models/Skill").createMany(5);
  const candidateModel = await Factory.model("App/Models/Candidate").create();
  await candidateModel.skills().attach([1, 2, 3]);
  const { status, body } = await client
    .get("/api/v1/candidates/"+candidateModel.id)
    .send({})
    .header("Authorization", `${type} ${token}`)
    .end();

  assert.equal(status, 200, "Http Status ");
  assert.equal(3,body.skills.length, "Skiils Equal")
  Object.keys(candidateModel.toJSON()).forEach((key) => {
    assert.equal(body[key], candidateModel[key], `Validation [${key}] field`);
  });
});


test("Delete Candidate", async ({ assert, client }) => {
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

  await Factory.model("App/Models/Skill").createMany(5);
  const candidateModel = await Factory.model("App/Models/Candidate").create();
  await candidateModel.skills().attach([1, 2, 3]);
  const { status, body } = await client
    .delete("/api/v1/candidates/"+candidateModel.id)
    .send({})
    .header("Authorization", `${type} ${token}`)
    .end();

  assert.equal(status, 200, "Http Status ");
  assert.equal(body.message,'Candidate Deleted')

});
