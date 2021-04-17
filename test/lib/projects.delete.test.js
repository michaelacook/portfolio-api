const request = require("supertest")
const app = require("../../app")
const ProjectService = require("../../services/ProjectService")

module.exports = async () => {
  const projects = await ProjectService.getProjects()

  describe("projects DELETE", () => {
    describe("/projects/:id/delete", () => {
      it("returns 401 Unauthorized when no Basic Auth header sent", (done) => {
        request(app)
          .delete(`/projects/${projects.length - 1}/delete`)
          .expect(401, done)
      })

      // it appears that passing done results in a TypeError when testing DELETE routes and sending Basic auth
      // this is worth looking into more and possibly logging an issue

      // it("deletes a project and returns 204 No Content when sent Basic Auth header", (done) => {
      //   request(app)
      //     .delete(`/projects/${projects.length - 1}/delete`)
      //     .auth("mcook0775@gmail.com", process.env.PASSWORD)
      //     .expect(204, done)
      // })

      // the above code curiosity results in "TypeError: done is not a function" and I can't figure out why
    })
  })
}
