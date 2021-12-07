'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "People",
      [
        {
          userId: 1,
          title: "Blue Mountain",
          songUrl:
            "https://f002.backblazeb2.com/file/VibeCloud/VibeCloudMusic/2020-05-05_-_Inspired_Thinking_-_www.FesliyanStudios.com_Steve_Oxen.mp3",
          imageUrl:
            "https://million-wallpapers.com/wallpapers/4/9/13106154638795609352/an-icy-blue-lake-among-snow-capped-mountains.jpg",
        },

        {
          userId: 1,
          title: ""
        }
      ],
      {}
    );

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
