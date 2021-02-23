const seedData = require('../utilities/seed-data');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const {
      categoriesList, usersList, countriesList,
    } = seedData;

    try {
      await queryInterface.bulkInsert('countries', countriesList);
      await queryInterface.bulkInsert('categories', categoriesList);
      await queryInterface.bulkInsert('users', usersList);
    } catch (error) {
      console.log(error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('countries', null, {});
    await queryInterface.bulkDelete('categories', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};
