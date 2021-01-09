"use strict";
const Skill = use("App/Models/Skill");
class SkillController {
  async index({ request, response }) {
    try {
      const skills = await Skill.all();
      return response.status(200).send(skills);
    } catch (error) {
      return response.status(500).send({ error: error });
    }
  }
}

module.exports = SkillController;
