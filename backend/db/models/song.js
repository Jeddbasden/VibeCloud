'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    songUrl: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
  }, {});
  Song.associate = function(models) {
    // associations can be defined here
    Song.belongsTo(models.User, { foreignKey: "userId", onDelete: "cascade" });
    Song.belongsTo(models.Album, { foreignKey: "albumId", onDelete: "cascade" });
    Song.hasMany(models.Comment, { foreignKey: "songId", onDelete: "cascade" });

    const columnMapping1 = {
      through: "Likes",
      otherKey: "userId",
      foreignKey: "songId",
    }
    Song.belongsToMany(models.User, columnMapping1)
  };
  return Song;
};
