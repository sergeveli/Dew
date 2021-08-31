'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    taskId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Group.associate = function(models) {
    Group.hasMany(models.Tasks, {foreignKey: 'taskId'})
    Group.belongsTo(models.Users, {foreignKey: 'userId'})
  };
  return Group;
};