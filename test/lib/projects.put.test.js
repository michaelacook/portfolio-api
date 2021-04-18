const request = require("supertest")
const { put } = require("../../app")
const app = require("../../app")

const ProjectService = require("../../services/ProjectService")

module.exports = () => {
  describe("projects PUT", () => {
    describe("/projects/:id/update", () => {
      it("returns 401 Unauthorized when Basic Auth header not sent", async () => {
        const projects = await ProjectService.getProjects()
        const { id } = projects[projects.length - 1]

        request(app)
          .put(`/projects/${id}/update`)
          .send({
            description: "updated",
          })
          .set("Accept", "application/json")
          .expect(401)
          .then(() => {
            done()
          })
      })

      it("updates a project in the database and returns 204 No Content when Basic Auth header sent", async () => {
        const projects = await ProjectService.getProjects()
        const { id } = projects[projects.length - 1]

        request(app)
          .put(`/projects/${id}/update`)
          .auth("mcook0775@gmail.com", process.env.PASSWORD)
          .send({
            description: "updated",
          })
          .set("Accept", "application/json")
          .expect(204)
          .then(() => {
            done()
          })
      })

      it("returns 404 Not Found when send PUT request with bad id", async () => {
        const projects = await ProjectService.getProjects()
        const { id } = projects[projects.length - 1]
        const badId = id + 1

        request(app)
          .put(`/projects/${badId}/update`)
          .auth("mcook0775@gmail.com", process.env.PASSWORD)
          .send({
            description: "updated",
          })
          .set("Accept", "application/json")
          .expect(404)
          .then(() => {
            done()
          })
      })
    })
  })
}
