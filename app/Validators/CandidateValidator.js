"use strict";

class Candidate {

  get validateAll () {
    return true
  }

  get rules() {
    return {
      email: "required|email",
      nome: "required",
      idade: "required|integer",
      linkedin: "required",
      skills: "required|array",
    };
  }


  get messages () {
    return {
      'email.required': 'Informe o email',
      'email.email': 'Informe um email válido',
      'nome.required': 'Informe o nome',
      'idade.required': 'Informe a idade',
      'idade.integer': 'Informe a idade em forma númerica',
      'linkedin.required': 'Informe o linkedin',
      'skills.required': 'Informe  as Skills',
      'skills.array': 'Informe ao menos uma Skill',
    }
  }
}

module.exports = Candidate;
