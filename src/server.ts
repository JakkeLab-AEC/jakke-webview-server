import { WebSocketServer, WebSocket } from "ws";
import readline from 'readline';

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

console.log(`WebSocket server is running on ws://localhost:${PORT}`);

wss.on("connection", (socket: WebSocket) => {
    console.log("New client connected");

    socket.on("message", (message) => {
        console.log(`Received: ${message}`);

        socket.send(`Server received: ${message}`);
    });

    socket.on("close", () => {
        console.log("Client disconnected");
    });

    socket.on("error", (error) => {
        console.error(`WebSocket error: ${error}`);
    });
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Enter message to send to WebSocket clients> ',
});

rl.prompt();

rl.on('line', (line) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(line);
      }
    });
  
    console.log(`Sent: ${line}`);
    rl.prompt();
});
  
  rl.on('close', () => {
    console.log('CLI closed. Shutting down server.');
    process.exit(0);
});