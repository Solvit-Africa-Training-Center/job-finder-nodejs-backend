'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 

    async up(queryInterface, Sequelize) {
      await queryInterface.addColumn('sampleusers', 'isActive',{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      });

      await queryInterface.addColumn('sampleusers', 'isBlocked', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      })

      await queryInterface.addColumn('sampleusers', 'lastLoginAt', {
        type: Sequelize.DATE,
        allowNull: true,
      })
    },
  

  async down (queryInterface, Sequelize) {
   
    await queryInterface.removeColumn('sampleusers', 'isActive');
    await queryInterface.removeColumn('sampleusers', 'isBlocked');
    await queryInterface.removeColumn('sampleusers', 'lastLoginAt')
  }
}