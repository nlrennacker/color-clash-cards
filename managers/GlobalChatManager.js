class GlobalChatManager {
  constructor() {
    this.connectedSockets = {};
  }

  connect(socket) {
    this.connectedSockets[socket.id] = socket;
    socket.on("disconnect", (reason) => {
      delete this.connectedSockets[socket.id];
      console.log(`[Global Chat Manager] Removed socket ID ${socket.id} (${reason}). # of connected sockets: ${Object.keys(this.connectedSockets).length}`);
    });
    console.log(`[Global Chat Manager] Added socket ID ${socket.id}, established by user ${socket.request.session.passport.user.username}. # of connected sockets: ${Object.keys(this.connectedSockets).length}`);
  }

  emitGlobalChatMessage(username, message) {
    for (const socketId in this.connectedSockets) {
      this.connectedSockets[socketId].emit("message", { username: username, message: message });
    }
    console.log(`[Global Chat Manager] Emitted global chat message "${message}" to ${Object.keys(this.connectedSockets).length} connected sockets.`);
  }

}

module.exports = new GlobalChatManager();