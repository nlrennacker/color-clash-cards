"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("games", {
      game_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      started: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      ended: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      chosen_wildcard_color: {
        type: Sequelize.ENUM(
          "RED",
          "YELLOW",
          "BLUE",
          "GREEN"),
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("games");
  }
};