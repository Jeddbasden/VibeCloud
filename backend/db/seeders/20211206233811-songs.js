'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Songs",
      [
        {
          id: 1,
          userId: 1,
          albumId: 1,
          title: "Inspired Thinking",
          songUrl:
          "https://f002.backblazeb2.com/file/VibeCloud/VibeCloudMusic/2020-05-05_-_Inspired_Thinking_-_www.FesliyanStudios.com_Steve_Oxen.mp3",
          imageUrl:
          "https://million-wallpapers.com/wallpapers/4/9/13106154638795609352/an-icy-blue-lake-among-snow-capped-mountains.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          // id: 2,
          userId: 1,
          albumId: 1,
          title: "Painful Memories",
          songUrl:
          "https://f002.backblazeb2.com/file/VibeCloud/VibeCloudMusic/2020-08-17_-_Painful_Memories_-_www.FesliyanStudios.com_Steve_Oxen.mp3",
          imageUrl:
          "http://wynwachhorst.com/wp-content/uploads/2013/09/nost-image.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Songs', null, {});
  }
};
