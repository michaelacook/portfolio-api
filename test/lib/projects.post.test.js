const request = require("supertest")
const app = require("../../app")

const testProject = {
  title: "test",
  description: "test",
  img_url: null,
  live_link: null,
  repo_url: null,
  technologies: [],
}

module.exports = () => {
  describe("projects POST", () => {
    describe("/projects/add", () => {
      it("returns 401 Unauthorized when attempting POST without Basic Auth header", (done) => {
        request(app).post("/projects/add").send(testProject).expect(401, done)
      })

      it("adds a test project to the database, returns 201 Created when Basic Auth headed sent", (done) => {
        request(app)
          .post("/projects/add")
          .auth("mcook0775@gmail.com", process.env.PASSWORD)
          .send(testProject)
          .set("Accept", "application/json")
          .expect(201, done)
      })
    })
  })
}
