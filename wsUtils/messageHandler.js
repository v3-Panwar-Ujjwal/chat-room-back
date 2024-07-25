module.exports = (ws, message) => {
  console.log('You sent a message');
  ws.send(`Recieved message ${message}`)

}
