const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const WebSocket = require("ws");

const connectionHandler = require("./wsUtils/connectionHandler");

const port = process.env.PORT || 8080;

const wss = new WebSocket.Server({ server: server });

connectionHandler(wss);
// wss.on("connection", (ws) => {
//   console.log("Client connected");
//   ws.send("Welcome to the room");
//
//   ws.on("close", () => {
//     console.log("Client disconnected");
//   });
// });

app.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(port, () => {
  console.log(`Server listening on the port ${port}`);
});
