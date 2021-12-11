'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert(
      'Comments',
      [
        {
          userId: 1,
          songId: 1,
          comment: "I love this song!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          songId: 1,
          comment: "Great Song!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          songId: 1,
          comment: "Eh its boosted #notimpressed",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          songId: 1,
          comment: "i love the vibez bro",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          songId: 1,
          comment: "im lonely",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          songId: 1,
          comment: "hello",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Comments', null, {});
  }
};
