'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Albums",
      [
        {
          id: 1,
          userId: 1,
          title: "In Your Feels",
          genre: "loFi",
          imageUrl:
            "https://p1.music.126.net/FVJFW5FG7B2f-JtHH8BNVQ==/109951165685423491.jpg",
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
