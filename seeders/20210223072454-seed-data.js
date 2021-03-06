const seedData = require('../utilities/seed-data');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // get the seed data from the imported seed data file
    const {
      categoriesList, usersList, activityList, activityUsersList,
    } = seedData;

    try {
      // insert the seed data into their respective tables
      await queryInterface.bulkInsert('categories', categoriesList);
      await queryInterface.bulkInsert('users', usersList);
      await queryInterface.bulkInsert('activities', activityList);
      await queryInterface.bulkInsert('activities_users', activityUsersList);
    } catch (error) {
      console.log(error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('activities', null, {});
    await queryInterface.bulkDelete('activities_users', null, {});
  },
};
