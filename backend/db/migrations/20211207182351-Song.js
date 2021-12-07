module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("Songs", "albumId", Sequelize.STRING),
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all(queryInterface.removeColumn("Songs", "albumId")); 
  },
};
