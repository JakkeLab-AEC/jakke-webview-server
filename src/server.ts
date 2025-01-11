import { WebSocketServer, WebSocket } from "ws";

// WebSocket 서버 초기화
const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

console.log(`WebSocket server is running on ws://localhost:${PORT}`);

// 클라이언트 연결 이벤트 처리
wss.on("connection", (socket: WebSocket) => {
    console.log("New client connected");

    // 클라이언트로부터 메시지를 수신
    socket.on("message", (message) => {
        console.log(`Received: ${message}`);

        // 클라이언트로 메시지 응답
        socket.send(`Server received: ${message}`);
    });

    // 연결 종료 이벤트 처리
    socket.on("close", () => {
        console.log("Client disconnected");
    });

    // 오류 처리
    socket.on("error", (error) => {
        console.error(`WebSocket error: ${error}`);
    });
});
