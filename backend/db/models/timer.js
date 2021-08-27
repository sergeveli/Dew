'use strict';
module.exports = (sequelize, DataTypes) => {
  const Timer = sequelize.define('Timer', {
    taskId: DataTypes.INTEGER,
    time: DataTypes.INTEGER
  }, {});
  Timer.associate = function(models) {
    // associations can be defined here
  };
  return Timer;
};