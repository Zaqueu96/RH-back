"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Candidate extends Model {
  skills() {
    return this.belongsToMany("App/Models/Skill", "candidate_id").pivotModel(
      "App/Models/CandidateSkill"
    );
  }
}

module.exports = Candidate;
