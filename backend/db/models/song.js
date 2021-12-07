'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    songUrl: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {});
  Song.associate = function(models) {
    // associations can be defined here
    Song.belongsTo(models.User, { foreignKey: "songId", onDelete: "cascade" });
    Song.belongsTo(models.Album, { foreignKey: "songId", onDelete: "cascade" });
    Song.hasMany(models.Comment, { foreignKey: "songId", onDelete: "cascade" });
  };
  return Song;
};
