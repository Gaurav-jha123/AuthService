'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      `SELECT id from Users;`
    );

    const roles = await queryInterface.sequelize.query(
      `SELECT id, name from Roles;`
    );

    const userRows = users[0];
    const roleRows = roles[0];

    const adminRole = roleRows.find(role => role.name === 'Admin');

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
