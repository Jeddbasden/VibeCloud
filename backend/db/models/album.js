'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {});
  Album.associate = function(models) {
    // associations can be defined here
    Album.belongsTo(models.User, { foreignKey: "userId", onDelete: "cascade" });
    Album.hasMany(models.Song, { foreignKey: "albumId", onDelete: "cascade" });
  };
  return Album;
};
