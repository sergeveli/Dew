'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    groupId: DataTypes.INTEGER,
    completed: DataTypes.BOOLEAN,
    reps: DataTypes.INTEGER,
    taskDate: DataTypes.DATE,
  }, {});
  Task.associate = function(models) {
    Task.belongsTo(models.User, {foreignKey: 'userId'})
    Task.belongsTo(models.Group, {foreignKey: 'groupId'})
    Task.hasOne(models.Timer, {foreignKey: 'taskId'})
  };
  return Task;
};