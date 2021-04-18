const request = require("supertest")
const app = require("../../app")
const { assert } = require("chai")

const testPost = {
  title: "Test Post",
  body: "This is a test post.",
  tags: JSON.stringify(["javascript", "node", "express", "test"]),
}

module.exports = () => {
  describe("posts POST", () => {
    describe("/posts/add", () => {
      it("returns 401 Unauthorized when POST request sent without Basic Auth header", (done) => {
        request(app).post("/posts/add").send(testPost).expect(401, done)
      })

      it("adds a post to the database, returns 201 Created and a post id with Basic Auth", (done) => {
        request(app)
          .post("/posts/add")
          .auth("mcook0775@gmail.com", process.env.PASSWORD)
          .send(testPost)
          .set("Accept", "application/json")
          .expect(201)
          .then((response) => {
            assert.isNumber(response.body)
            done()
          })
          .catch((err) => done(err))
      })
    })
  })
}
