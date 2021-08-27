'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    completed: DataTypes.BOOLEAN,
    reps: DataTypes.INTEGER,
    taskDate: DataTypes.DATE
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};