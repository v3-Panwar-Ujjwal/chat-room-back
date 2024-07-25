const { WebSocket } = require("ws");

module.exports = function(wss) {
  wss.on("connection", (ws) => {
    console.log("Cliend connected");

    ws.on("close", () => {
      console.log("Client disconnected");
    });

    ws.on("message", (data, isBinary) => {
      wss.clients.forEach((client) => {
        if (ws !== client && client.readyState === WebSocket.OPEN)
          client.send(data, { binary: isBinary });
      });
    });
  });
};
