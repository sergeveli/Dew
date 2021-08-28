// 'use strict';

// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     /*
//       Add altering commands here.
//       Return a promise to correctly handle asynchronicity.

//       Example:
//       return queryInterface.bulkInsert('People', [{
//         name: 'John Doe',
//         isBetaMember: false
//       }], {});
//     */
//   },

//   down: (queryInterface, Sequelize) => {
//     /*
//       Add reverting commands here.
//       Return a promise to correctly handle asynchronicity.

//       Example:
//       return queryInterface.bulkDelete('People', null, {});
//     */
//   }
// };

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Tasks', [
        { userId: 1, 
          title: 'organize your vinyls.', 
          description:'alphabetical order by artist', 
          completed: false, 
          reps: null, 
          taskDate: null, 
          createdAt: new Date(), 
          updatedAt: new Date()}
      ], {});
 
  },

  down: (queryInterface, Sequelize) => {   
      return queryInterface.bulkDelete('Tasks', null, {});
   
  }
};