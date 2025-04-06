import WebSocket, { WebSocketServer } from "ws";
import http from "http";

const server = http.createServer(function (req: any, res: any) {
  console.log("request received", req);
  res.end("hello from server");
});

const wss = new WebSocketServer({ server });

wss.on("connection", function (socket) {
  socket.on("error", console.error);

  socket.on("message", function (data, isBinary) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
  socket.send('Hello! Message From Server!!');
});

server.listen(3000, () => {
  console.log("server is started and running");
});
