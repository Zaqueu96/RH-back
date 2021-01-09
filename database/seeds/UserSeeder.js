"use strict";

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const User = use("App/Models/User");
const Database = use("Database");
class UserSeeder {
  async run() {
    const joaoData = {
      username: "Joao MAIL",
      email: "joao@mail.com",
      password: "joao@123",
    };
    const mariaData = {
      username: "Maria MAIL",
      email: "maria@mail.com",
      password: "maria@123",
    };

    await Promise.all(
      [mariaData, joaoData].map((data) => {
        return User.findOrCreate({email:data.email}, data);
      })
    );
  }
}

module.exports = UserSeeder;
