const { WebSocketServer } = require("ws");
const { subscriber } = require("./redisClient");

const wss = new WebSocketServer({ port: 8080 });
let allsocket = [];

// ✅ Corrected variable names and added cleanup
wss.on("connection", function connection(socket) {
  console.log("✅ User connected");
  allsocket.push(socket);

  socket.on("close", () => {
    console.log("❌ User disconnected");
    allsocket = allsocket.filter((s) => s !== socket);
  });

  socket.send(JSON.stringify({ message: "Connected to orderbook feed 🔄" }));
});

// ✅ Redis subscriber listener (IIFE)
(async function orderbookUpdate() {
  await subscriber.subscribe("book_update", (message) => {
    try {
      const parsedMessage = JSON.parse(message);
      console.log("📩 Received book update:", parsedMessage);

      // broadcast to all connected WebSocket clients
      broadcast(JSON.stringify(parsedMessage));
    } catch (err) {
      console.error("Error parsing Redis message:", err);
    }
  });
})();

// ✅ Broadcast helper function (with parameter)
function broadcast(message) {
  allsocket.forEach((s) => {
    if (s.readyState === 1) {
      s.send(message);
    }
  });
}
