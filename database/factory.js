"use strict";

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
/** @type {import('chance')} */
const chance = use("chance");

Factory.blueprint("App/Models/User", (faker) => {
  return {
    username: faker.username(),
    password: faker.password(),
  };
});

Factory.blueprint("App/Models/Skill", (faker) => {
  return {
    name: faker.word(),
  };
});

Factory.blueprint("App/Models/Candidate", (faker) => {
  return {
    nome: faker.sentence({ word: 4 }),
    emails: faker.email(),
    idade: faker.integer({ min: 10, max: 99 }),
    linkedin: faker.url(),
  };
});
