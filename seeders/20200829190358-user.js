"use strict"

// add author to the database
module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert("Users", [
      {
        firstName: "Michael",
        lastName: "Cook",
        email: "mcook0775@gmail.com",
        //used 4 rounds to generate hash
        password:
          "$2y$04$7Epojqlna55PxCn.stJVR.cKHv8f8It/e41We2KBqWoQcConlJQQO",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },
  down: async (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Users", null, {}),
}
