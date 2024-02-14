module.exports = (server) => {
  const { Server } = require("socket.io");
  // Global chat socket
  const GlobalChatManager = require("../managers/GlobalChatManager");
  new Server().listen(server, { path: "/global-chat/" })
    .use((socket, next) => {
      require("../middleware/session")(socket.request, {}, next);
    })
    .use((socket, next) => {
      if (!socket?.request?.session?.passport?.user) {
        return next(new Error("Not logged in."));
      }
      return next();
    })
    .on("connection", socket => {
      console.log(`User connected to /global-chat/ socket: ${JSON.stringify({
        user_id: socket.request.session.passport.user.user_id,
        username: socket.request.session.passport.user.username,
      })}`);
      GlobalChatManager.connect(socket);
    });
  // Games socket
  const GameManager = require("../managers/GameManager");
  new Server().listen(server, { path: "/games/" })
    .use((socket, next) => {
      require("../middleware/session")(socket.request, {}, next);
    })
    .use(async (socket, next) => {
      if (!socket?.request?.session?.passport?.user) {
        return next(new Error("Not logged in."));
      }
      if (!socket?.handshake?.query?.game_id) {
        return next(new Error("Query missing game_id."));
      }
      if (isNaN(parseInt(socket?.handshake?.query?.game_id))) {
        return next(new Error("game_id must be a number."));
      }
      if (!await GameManager.getGameByGameId(socket.handshake.query.game_id)) {
        return next(new Error(`Game with game_id ${socket.handshake.query.game_id} does not exist.`));
      }
      return next();
    })
    .on("connection", async socket => {
      console.log(`User connected to /games/ socket: ${JSON.stringify({
        user_id: socket.request.session.passport.user.user_id,
        username: socket.request.session.passport.user.username,
      })}`);
      (await GameManager
        .getGameByGameId(socket.handshake.query.game_id))
        .connect(socket);
    });
}