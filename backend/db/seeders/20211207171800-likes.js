'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Likes",
      [
        {
          userId: 1,
          songId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          songId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          songId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          songId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          songId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          songId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          songId: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          songId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          songId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          songId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          songId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          songId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          songId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          songId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          songId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          songId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          songId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          songId: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          songId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          songId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Likes', null, {});
  }
};
