"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const cards = [];

    /**
     * NUMBER CARDS
     */
    const numbers = [
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
    ];
    const colors = [
      "RED",
      "YELLOW",
      "BLUE",
      "GREEN",
    ];
    // One set of ZERO for each color
    // Two sets of all other numbers for each color
    for (const color of colors) {
      for (const number of numbers) {
        cards.push({
          color: color,
          value: number,
        });
        if (number !== "ZERO") {
          cards.push({
            color: color,
            value: number,
          });
        }
      }
    }

    /**
     * ACTION CARDS
     */
    const actions = [
      "DRAW_TWO",
      "SKIP",
      "REVERSE",
    ];
    // Two sets of each action for each color
    for (const color of colors) {
      for (const action of actions) {
        cards.push({
          color: color,
          value: action,
        }, {
          color: color,
          value: action,
        });
      }
    }

    /**
     * WILD CARDS
     */
    const wilds = [
      "WILD_CARD",
      "DRAW_FOUR",
    ];
    const wildColor = "BLACK";
    // Four sets of each wildcard
    for (const wild of wilds) {
      cards.push({
        color: wildColor,
        value: wild,
      }, {
        color: wildColor,
        value: wild,
      }, {
        color: wildColor,
        value: wild,
      }, {
        color: wildColor,
        value: wild,
      });
    }
    await queryInterface.bulkInsert("cards", cards);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("game_cards", {});
    await queryInterface.bulkDelete("cards", {});
  }
};
