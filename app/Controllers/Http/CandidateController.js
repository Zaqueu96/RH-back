"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
/** @type {typeof import('../../Models/Candidate')} */
const Candidate = use("App/Models/Candidate");
/** @type {typeof import('../../Models/CandidateSkill')} */
const CandidateSkill = use("App/Models/CandidateSkill");
class CandidateController {
  /**
   * List and Filter Candidates
   */
  async index({ request, response }) {
    try {
      let candidateIds = null;
      const { nameOrEmail, skills: skillsData } = request.all();

      console.log("all: ", request.all());
      if (skillsData) {
        const skls = skillsData.split(",").filter((n) => Number.isInteger(+n));
        candidateIds = await CandidateSkill.query()
          .whereIn("skill_id", skls)
          .ids();
      }
      const queryModel = Candidate.query();

      if (nameOrEmail) {
        queryModel.where("nome", "like", `%${nameOrEmail}%`);
        queryModel.orWhere("email", "like", `%${nameOrEmail}%`);
      }
      if (candidateIds && candidateIds.length > 0) {
        queryModel.whereIn("id", candidateIds);
      }

      queryModel.with("skills");
      const candidates = await queryModel.fetch();
      return response.status(200).send(candidates);
    } catch (e) {
      console.log("Erro: ", e);
      return response.status(500).send({ error: e });
    }
  }

  /**
   * Store Candidate
   * @param {*} param0
   */
  async store({ request, response }) {
    try {
      const { nome, email, linkedin, idade, skills } = request.body;
      const ids = skills.map((v) => v.id);
      console.log("ids", ids);
      const candidate = new Candidate();
      candidate.merge({ nome, email, linkedin, idade });
      await candidate.save();
      await candidate.skills().attach(ids);
      return response.status(200).send(candidate);
    } catch (e) {
      console.log("error: ", e);
      return response.status(500).send({ error: e });
    }
  }

  /**
   * Update Candidate
   * @param {*} param0
   */
  async update({ request, response }) {
    try {
      const { id } = request.params;
      const { nome, email, linkedin, idade, skills } = request.body();
      const candidate = await Candidate.find(parseInt(id));
      candidate.merge({ nome, email, linkedin, idade });
      await candidate.save();
      return this.show({ request, response });
    } catch (e) {
      return response.status(500).send({ error: e });
    }
  }

  /**
   * Show Candidate
   * @param {*} param0
   */
  async show({ request, response }) {
    try {
      const { id } = request.params;
      const candidate = await Candidate.find(id);
      return response.status(200).send(candidate);
    } catch (e) {
      return response.status(500).send({ error: e });
    }
  }

  /**
   * Delete Candidate
   * @param {*} param0
   */
  async delete({ request, response }) {
    try {
      const { id } = request.params;
      const candidate = await Candidate.find(id);
      await candidate.delete();
      return response.status(200).send({ message: "Candidate Deleted" });
    } catch (e) {
      return response.status(500).send({ error: e });
    }
  }
}

module.exports = CandidateController;
