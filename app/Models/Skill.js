'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Skill extends Model {

  static get computed () {
    return ['isSelected']
  }

  getIsSelected () {
    return false;
  }
}

module.exports = Skill
