'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // Fetch the user and role IDs that you want to associate
    const users = await queryInterface.sequelize.query(
      `SELECT id from Users;`
    );

    const roles = await queryInterface.sequelize.query(
      `SELECT id, name from Roles;`
    );

    const userRows = users[0];
    const roleRows = roles[0];

    // Assuming we want to assign the 'ADMIN' role to the first user
    const adminRole = roleRows.find(role => role.name === 'ADMIN');

    await queryInterface.bulkInsert('User_Roles', [
      {
        userId: userRows[0].id, // Replace with the user ID you want to assign
        roleId: adminRole.id,   // Replace with the role ID of 'ADMIN'
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User_Roles', null, {});
  }
};
