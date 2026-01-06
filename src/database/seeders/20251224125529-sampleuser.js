'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);
    const password1 = await bcrypt.hash('pass123', 10);
    const password2 = await bcrypt.hash('pass123', 10);
    const password3 = await bcrypt.hash('pass123', 10);
    const password4 = await bcrypt.hash('pass123', 10);
    const password5 = await bcrypt.hash('pass123', 10);

    await queryInterface.bulkInsert('sampleusers', [
      {
        email: 'admin@example.com',
        password: adminPassword,
        role: 'ADMIN',
        isActive: true,
        isBlocked: false,
        failedLoginAttempts: 0,
        blockedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user@example.com',
        password: userPassword,
        role: 'USER',
        isActive: true,
        isBlocked: false,
        failedLoginAttempts: 0,
        blockedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 🔹 5 autres utilisateurs
      {
        email: 'user1@example.com',
        password: password1,
        role: 'USER',
        isActive: true,
        isBlocked: false,
        failedLoginAttempts: 0,
        blockedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'steph@gmail.com',
        password: password2,
        role: 'USER',
        isActive: true,
        isBlocked: false,
        failedLoginAttempts: 0,
        blockedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'joe@gmail.com',
        password: password3,
        role: 'USER',
        isActive: true,
        isBlocked: false,
        failedLoginAttempts: 0,
        blockedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'jules@gmail.com',
        password: password4,
        role: 'USER',
        isActive: true,
        isBlocked: false,
        failedLoginAttempts: 0,
        blockedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'gaelle@gmail.com',
        password: password5,
        role: 'USER',
        isActive: true,
        isBlocked: false,
        failedLoginAttempts: 0,
        blockedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('sampleusers', null, {});
  },
};
