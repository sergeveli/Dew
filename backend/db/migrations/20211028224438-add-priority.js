'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Tasks',
      'priority',
      {
        type: Sequelize.DataTypes.Integer,
      },
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Tasks', 'priority')
  }
};
