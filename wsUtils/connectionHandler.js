const { WebSocket } = require("ws");
const { v4: uuidv4 } = require("uuid");

const clients = new Map();

module.exports = function(wss) {
  wss.on("connection", (ws) => {
    console.log("Cliend connected");
    const clientId = uuidv4();
    clients.set(ws, clientId);

    ws.send(JSON.stringify({ type: "init", id: clientId }));

    ws.on("close", () => {
      clients.delete(ws);
      console.log("Client disconnected");
    });

    ws.on("message", (data, isBinary) => {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN)
          client.send(data, { binary: isBinary });
      });
    });
    ws.on("error", (error) => {
      console.error(`Client ${clientId} error:`, error);
    });
  });
};
