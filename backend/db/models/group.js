'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {});
  Group.associate = function(models) {
    Group.hasMany(models.Task, {foreignKey: 'groupId'})
    Group.belongsTo(models.User, {foreignKey: 'userId'})
  };
  return Group;
};