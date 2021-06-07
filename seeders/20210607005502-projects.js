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
        technologies: ["TypeScript", "Node.js", "Sequelize", "NestJS"],
        live_link: null,
      },
      {
        title: "Image Gallery App",
        description: "A simple photo gallery app based on the Flickr API.",
        img_url:
          "https://michaelacook-portfolio.s3.us-east-2.amazonaws.com/react-gallery-app.png",
        repo_url: "https://github.com/michaelacook/react-gallery-app",
        technologies: ["JavaScript", "React.js", "Flickr API"],
        live_link: "https://react-gallery-app-two.vercel.app/",
      },
      {
        title: "Employee Directory",
        description:
          "A mock employee directory that uses the Random User Generator API",
        img_url:
          "https://michaelacook-portfolio.s3.us-east-2.amazonaws.com/employee-directory.jpg",
        repo_url: "https://github.com/michaelacook/employee-directory",
        technologies: [
          "HTML",
          "CSS",
          "JavaScript",
          "Random User Generator API",
        ],
        live_link: "https://michaelacook.github.io/employee-directory/",
      },
      {
        title: "Classic Minesweeper",
        description: "A clone of the classic Minesweeper for Windows 98.",
        img_url:
          "https://michaelacook-portfolio.s3.us-east-2.amazonaws.com/minesweeper.png",
        repo_url: "https://github.com/michaelacook/minesweeper",
        technologies: ["HTML", "CSS", "JavaScript"],
        live_link: "https://michaelacook.github.io/minesweeper/",
      },
      {
        title: "Gif Sharing App",
        description:
          "A simple GIF searching and sharing app that uses the GIPHY API",
        img_url:
          "https://michaelacook-portfolio.s3.us-east-2.amazonaws.com/giphy-app.jpg",
        repo_url: "https://github.com/michaelacook/giphy-app",
        technologies: ["HTML", "CSS", "JavaScript", "GIPHY API"],
        live_link: "https://michaelacook.github.io/giphy-app/",
      },
      {
        title: "Library Manager",
        description:
          "A basic CRUD application for managing library catalogue records",
        img_url:
          "https://michaelacook-portfolio.s3.us-east-2.amazonaws.com/library_manager.png",
        repo_url: "https://github.com/michaelacook/library-manager",
        technologies: ["Node.js", "Express.js", "Sequelize.js", "HTML", "CSS"],
        live_link: "https://library-manager-demo.herokuapp.com/",
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete("Projects", null, {})
  },
}
