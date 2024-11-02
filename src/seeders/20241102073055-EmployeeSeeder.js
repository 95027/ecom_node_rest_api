"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("employees", [
      {
        name: "employee1",
        email: "employee1@mail.com",
        password: await bcrypt.hash("password1", 10),
      },
      {
        name: "employee2",
        email: "employee2@mail.com",
        password: await bcrypt.hash("password2", 10),
      },
      {
        name: "employee3",
        email: "employee3@mail.com",
        password: await bcrypt.hash("password3", 10),
      },
      {
        name: "employee4",
        email: "employee4@mail.com",
        password: await bcrypt.hash("password4", 10),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
