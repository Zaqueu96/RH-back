"use strict";

const Candidate = use("App/Models/Candidate");
class CandidateController {
  /**
   * List and Filter Candidates
   */
  async index({ request, response }) {
    try {
      const candidates = await Candidate.all();
      return response.status(200).send(candidates);
    } catch (e) {
      return response.status(500).send({ error: e });
    }
  }

  /**
   * Store Candidate
   * @param {*} param0
   */
  async store({ request, response }) {
    try {
      const { nome, email, linkedin, idade, skills } = request.body();
      const candidate = new Candidate();
      candidate.merge({ nome, email, linkedin, idade });
      await candidate.save();
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
