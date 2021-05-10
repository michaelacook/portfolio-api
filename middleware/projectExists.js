const ProjectSerive = require("../services/ProjectService")

module.exports = () => {
  return async function (req, res, next) {
    const { id } = req.params
    const project = await ProjectSerive.getProject(id)
    if (!project) {
      return res.status(404).end()
    }
    return next()
  }
}
