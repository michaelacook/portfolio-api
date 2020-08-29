const { User } = require("../models/index")

module.exports = class UserService {
  /**
   * Update table cols specified in payload
   * @param {Object} payload - object containing properties to change
   * @return {Promise} true on success, false on fail
   */
  static async updateUser(payload) {
    try {
      const user = await User.findByPk(1)
      for (let name in payload) {
        user[name] = payload[name]
        await user.save()
      }
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
