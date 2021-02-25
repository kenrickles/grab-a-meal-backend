const seedData = require('../utilities/seed-data');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const {
      categoriesList, usersList, activityList,
    } = seedData;

    try {
      await queryInterface.bulkInsert('categories', categoriesList);
      await queryInterface.bulkInsert('users', usersList);
      await queryInterface.bulkInsert('activities', activityList);
    } catch (error) {
      console.log(error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('activities', null, {});
  },
};
