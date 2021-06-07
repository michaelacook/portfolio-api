"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert("Projects", [
      {
        title: "The Mario API",
        description: "A REST API for managing Mario Bros franchise data.",
        img_url:
          "https://michaelacook-portfolio.s3.us-east-2.amazonaws.com/mario-mushroom.png",
        repo_url: "https://github.com/michaelacook/mario-api",
        technologies: JSON.stringify([
          "TypeScript",
          "Node.js",
          "Sequelize",
          "NestJS",
        ]),
        live_link: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Image Gallery App",
        description: "A simple photo gallery app based on the Flickr API.",
        img_url:
          "https://michaelacook-portfolio.s3.us-east-2.amazonaws.com/react-gallery-app.png",
        repo_url: "https://github.com/michaelacook/react-gallery-app",
        technologies: JSON.stringify(["JavaScript", "React.js", "Flickr API"]),
        live_link: "https://react-gallery-app-two.vercel.app/",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Employee Directory",
        description:
          "A mock employee directory that uses the Random User Generator API",
        img_url:
          "https://michaelacook-portfolio.s3.us-east-2.amazonaws.com/employee-directory.jpg",
        repo_url: "https://github.com/michaelacook/employee-directory",
        technologies: JSON.stringify([
          "HTML",
          "CSS",
          "JavaScript",
          "Random User Generator API",
        ]),
        live_link: "https://michaelacook.github.io/employee-directory/",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Classic Minesweeper",
        description: "A clone of the classic Minesweeper for Windows 98.",
        img_url:
          "https://michaelacook-portfolio.s3.us-east-2.amazonaws.com/minesweeper.png",
        repo_url: "https://github.com/michaelacook/minesweeper",
        technologies: JSON.stringify(["HTML", "CSS", "JavaScript"]),
        live_link: "https://michaelacook.github.io/minesweeper/",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Gif Sharing App",
        description:
          "A simple GIF searching and sharing app that uses the GIPHY API",
        img_url:
          "https://michaelacook-portfolio.s3.us-east-2.amazonaws.com/giphy-app.jpg",
        repo_url: "https://github.com/michaelacook/giphy-app",
        technologies: JSON.stringify([
          "HTML",
          "CSS",
          "JavaScript",
          "GIPHY API",
        ]),
        live_link: "https://michaelacook.github.io/giphy-app/",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Library Manager",
        description:
          "A basic CRUD application for managing library catalogue records",
        img_url:
          "https://michaelacook-portfolio.s3.us-east-2.amazonaws.com/library_manager.png",
        repo_url: "https://github.com/michaelacook/library-manager",
        technologies: JSON.stringify([
          "Node.js",
          "Express.js",
          "Sequelize.js",
          "HTML",
          "CSS",
        ]),
        live_link: "https://library-manager-demo.herokuapp.com/",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete("Projects", null, {})
  },
}
