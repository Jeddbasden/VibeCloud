'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User, { foreignKey: "userId", onDelete: "cascade" });
    Comment.belongsTo(models.Song, { foreignKey: "songId", onDelete: "cascade" });
  };
  return Comment;
};
