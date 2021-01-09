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
const Database = use('Database')
class UserSeeder {
  async run() {
    let user = new User();
    user.username = "Joao MAIL";
    user.email = "joao@mail.com";
    user.password = "joao@123";
    await user.save();

    let user2 = new User();
    user2.username = "Maria MAIL";
    user2.email = "maria@mail.com";
    user2.password = "maria@123";
    await user2.save();

  }
}

module.exports = UserSeeder;
