'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Albums",
      [
        {
          userId: 1,
          title: "In Your Feels",
          genre: "loFi",
          imageUrl:
            "https://p1.music.126.net/FVJFW5FG7B2f-JtHH8BNVQ==/109951165685423491.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          title: "People in Paris",
          genre: "classic",
          imageUrl:
            "https://images.genius.com/80fc6014277eaaf1c8d7c9c9120db674.600x600x1.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          title: "Life of lablo",
          genre: "bap",
          imageUrl:
            "https://phandroid.s3.amazonaws.com/wp-content/uploads/2016/04/life-of-pablo.jpeg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Albums', null, {});
  }
};
