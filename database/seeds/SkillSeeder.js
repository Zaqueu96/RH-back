"use strict";

/*
|--------------------------------------------------------------------------
| SkillSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Skill = use("App/Models/Skill");
class SkillSeeder {
  async run() {
    const skills = [
      "C#",
      "Javascript",
      "Nodejs",
      "Angular",
      "React",
      "Ionic",
      "Mensageria",
      "PHP",
      "Laravel",
    ];
    await Promise.all(
      skills.map((n) => {
        return Skill.findOrCreate({ name: n }, { name: n });
      })
    );
  }
}

module.exports = SkillSeeder;
