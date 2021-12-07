module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn("Songs", "albumId", Sequelize.STRING),
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      
    ] 
  },
};
