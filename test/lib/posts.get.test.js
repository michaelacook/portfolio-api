const request = require("supertest")
const app = require("../../app")
const { assert } = require("chai")
const PostService = require("../../services/PostService")

module.exports = () => {
  describe("posts GET", () => {
    describe("/posts", () => {
      it("returns 200 OK and an array of posts", (done) => {
        request(app)
          .get("/posts")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            assert.isArray(response.body)
            done()
          })
          .catch((err) => done(err))
      })
    })
  })
}
