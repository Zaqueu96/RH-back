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
        const { rows } = await CandidateSkill.query()
          .whereIn("skill_id", skls)
          .fetch();
        candidateIds = rows.map((v) => v.candidate_id);
      }

      const queryModel = Candidate.query();

      if (candidateIds && candidateIds.length > 0) {
        queryModel.whereIn("id", candidateIds);
      }
      if (nameOrEmail) {
        queryModel.where("nome", "like", `%${nameOrEmail}%`);
        queryModel.orWhere("email", "like", `%${nameOrEmail}%`);
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
      const candidate = new Candidate();
      candidate.merge({ nome, email, linkedin, idade });
      await candidate.save();
      await candidate.skills().attach(ids);
      await candidate.load("skills");
      return response.status(200).send(candidate);
    } catch (e) {
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
      const { nome, email, linkedin, idade, skills } = request.body;
      const ids = skills.map((v) => v.id);
      const candidate = await Candidate.find(id);
      candidate.merge({ nome, email, linkedin, idade });
      await candidate.save();
      await candidate.skills().detach();
      await candidate.skills().attach(ids);
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
      await candidate.load("skills");
      return response.status(200).send(candidate);
    } catch (e) {
      return response.status(500).send({ error: e });
    }
  }

  /**
   * Delete Candidate
   * @param {*} param0
   */
  async destroy({ request, response }) {
    try {
      const { id } = request.params;
      const candidate = await Candidate.findOrFail(id);
      await candidate.delete();
      return response.status(200).send({ message: "Candidate Deleted" });
    } catch (e) {
      return response.status(500).send({ error: e });
    }
  }
}

module.exports = CandidateController;
