const pgp = require("pg-promise");
const db = require("../db");
const Game = require("./dependencies/Game");

class GameManager {
  constructor() {
    this.games = {};
  }

  async getGameByGameId(gameId) {
    if (this.games[gameId]) {
      if (this.games[gameId].deleted) {
        delete this.games[gameId];
      } else {
        return this.games[gameId];
      }
    }

    const getGameByGameId = new pgp.PreparedStatement({
      name: "get-game-by-game-id",
      text: "SELECT * FROM games WHERE game_id = $1",
    });
    if (await db.oneOrNone(getGameByGameId, [gameId])) {
      this.games[gameId] = await new Game(gameId);
      return this.games[gameId];
    }

    return null;
  }

  async getAllGames() {
    const getGames = new pgp.PreparedStatement({
      name: "get-games",
      text: "SELECT * FROM games",
    });
    const games = await db.query(getGames);

    return games;
  }

  async getJoinableGames() {
    const getJoinableGames = new pgp.PreparedStatement({
      name: "get-joinable-games",
      text: "SELECT * FROM games WHERE started = FALSE AND ended = FALSE",
    });
    const games = await db.query(getJoinableGames);

    return games;
  }

  async createNewGame(hostUserId) {
    const newGameId = await db.tx(async t => {
      const createGame = new pgp.PreparedStatement({
        name: "create-game",
        text: "INSERT INTO games (started, ended) VALUES (FALSE, FALSE) RETURNING game_id",
      });
      const newGame = await t.one(createGame, []);

      const insertGameUser = new pgp.PreparedStatement({
        name: "insert-game-user",
        text: "INSERT INTO game_users (game_id, user_id, play_order, state, is_host) VALUES ($1, $2, $3, $4, $5)",
      });
      await t.none(insertGameUser, [
        newGame.game_id,
        hostUserId,
        -1,
        "PLAYING",
        true,
      ]);

      const insertGameCards = new pgp.PreparedStatement({
        name: "insert-game-cards",
        text: "INSERT INTO game_cards SELECT $1 AS game_id, card_id, 'DECK' AS location, ROW_NUMBER() OVER (ORDER BY card_id) - 1 AS order FROM cards",
      });
      await t.none(insertGameCards, [
        newGame.game_id,
      ]);

      return newGame.game_id;
    });

    this.games[newGameId] = await new Game(newGameId);

    return newGameId;
  }
}

module.exports = new GameManager();