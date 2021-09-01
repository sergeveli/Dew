'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    taskId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Group.associate = function(models) {
    Group.hasMany(models.Task, {foreignKey: 'taskId'})
    Group.belongsTo(models.User, {foreignKey: 'userId'})
  };
  return Group;
};