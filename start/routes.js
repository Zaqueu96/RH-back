"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");
const User = use("App/Models/User");
const Skill = use("App/Models/Skill");
Route.get("/", async () => {
  return await Skill.all();
});

Route.post("/auth/login", "AuthController.login");
Route.group(() => {
  /** Skills Route */
  Route.get("/skills", "SkillController.index");
Route.resource("candidates", "CandidateController").validator(new Map([
    [['candidates.store'], ['CandidateValidator']],
    [['candidates.update'], ['CandidateValidator']]
  ]))
})
  .prefix("api/v1")
  .middleware("auth");
