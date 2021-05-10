const PostService = require("../services/PostService")

module.exports = () => {
  return async function (req, res, next) {
    const { id } = req.params
    const post = await PostService.getPost(id)
    if (!post) {
      return res.status(404).end()
    }
    return next()
  }
}
