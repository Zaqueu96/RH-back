"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CandidateSkillSchema extends Schema {
  up() {
    this.create("candidate_skills", (table) => {
      table.increments();
      table
        .integer("candidate_id")
        .unsigned()
        .references("id")
        .inTable("candidates")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("skill_id")
        .unsigned()
        .references("id")
        .inTable("skills")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("candidate_skills");
  }
}

module.exports = CandidateSkillSchema;
