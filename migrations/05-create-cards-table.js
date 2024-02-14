"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cards", {
      card_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      color: {
        type: Sequelize.ENUM(
          "RED",
          "YELLOW",
          "BLUE",
          "GREEN",
          "BLACK"),
        allowNull: false,
      },
      value: {
        type: Sequelize.ENUM(
          "ZERO",
          "ONE",
          "TWO",
          "THREE",
          "FOUR",
          "FIVE",
          "SIX",
          "SEVEN",
          "EIGHT",
          "NINE",
          "DRAW_TWO",
          "SKIP",
          "REVERSE",
          "WILD_CARD",
          "DRAW_FOUR"),
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("cards");
  }
};