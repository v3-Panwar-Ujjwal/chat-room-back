const messageHandler = require("./messageHandler");

module.exports = function(wss) {
  wss.on("connection", (ws) => {
    console.log("Cliend connected");

    ws.on("close", () => {
      console.log("Client disconnected");
    });

    ws.on("message", (message) => {
      messageHandler(ws, message);
    });
  });
};
