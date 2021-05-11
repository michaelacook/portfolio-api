"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert("Messages", [
      {
        from: "mcook0775@gmail.com",
        subject: "Welcome!",
        content: "This is a demo message.",
        read: false,
        archived: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete("Messages", null, {})
  },
}
