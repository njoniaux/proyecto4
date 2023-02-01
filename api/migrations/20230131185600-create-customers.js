"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("customers", {
      customerNumber: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customerName: {
        type: Sequelize.STRING,
      },
      contactLastName: {
        type: Sequelize.STRING,
      },
      contactFirstName: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      addressLine1: {
        type: Sequelize.STRING,
      },
      addressLine2: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      postalCode: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      salesRepEmployeeNumber: {
        type: Sequelize.INTEGER,
      },
      creditLimit: {
        type: Sequelize.FLOAT,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("customers");
  },
};
