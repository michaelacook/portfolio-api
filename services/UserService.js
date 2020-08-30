const { User } = require("../models/index")

/**
 * Makes up part of service layer for interacting with models
 * and processes data
 * Encapsulates static methods for interacting with the User model
 */
module.exports = class UserService {
  /**
   * Return object for owner of site
   * @return {Promise} resolves with user object
   * @return {Promise} rejects with boolean false
   */
  static async getUser() {
    try {
      await User.sync()
      const user = await User.findByPk(1)
      return user
    } catch (error) {
      console.log(error)
      return false
    }
  }

  /**
   * Update table cols specified in payload
   * @param {Object} payload - object containing properties to change
   * @return {Promise} resolves with true on success, false on fail
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
