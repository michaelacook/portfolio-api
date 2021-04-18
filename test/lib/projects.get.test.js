const request = require("supertest")
const app = require("../../app")
const { assert } = require("chai")

const ProjectService = require("../../services/ProjectService")

module.exports = () => {
  describe("projects GET", () => {
    describe("/projects", () => {
      it("returns a 200 OK and an array of projects", (done) => {
        request(app)
          .get("/projects")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            assert.isArray(response.body)
            done()
          })
          .catch((err) => done(err))
      })
    })

    describe("/projects/:id", () => {
      it("returns a 200 OK and a single project object", async () => {
        const projects = await ProjectService.getProjects()
        const { id } = projects[projects.length - 1]

        request(app)
          .get(`/projects/${id}`)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            assert.isObject(response.body)
            assert.property(response.body, "title")
            assert.property(response.body, "description")
            assert.property(response.body, "img_url")
            assert.property(response.body, "repo_url")
            assert.property(response.body, "technologies")
            assert.property(response.body, "live_link")
            done()
          })
      })

      it("returns a 404 Not Found when passed a non-existent id", async () => {
        const projects = await ProjectService.getProjects()
        const { id } = projects[projects.length - 1]
        const badId = id + 1

        request(app)
          .get(`/projects/${badId}`)
          .expect(404)
          .then((response) => {
            done()
          })
      })
    })
  })
}
