import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const httpServer = createServer((req, res) => {
      handler(req, res).catch((err) => {
        console.error("Error handling request:", err);
        res.statusCode = 500;
        res.end("Internal Server Error");
      });
    });

    const io = new Server(httpServer);
    const connectedClients = new Set();

    io.on("connection", (socket) => {
      connectedClients.add(socket.id);
      io.emit("connected-clients", connectedClients.size);

      console.log("A user connected");
      console.log("Connected clients:", connectedClients.size);

      socket.on("post", (post) => {
        socket.send(post);
        socket.broadcast.emit("post", post);
      });

      socket.on("comment", (comment) => {
        socket.send(comment);
        socket.broadcast.emit("comment", comment);
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected");
        connectedClients.delete(socket.id);
        io.emit("connected-clients", connectedClients.size);
      });
    });

    httpServer
      .once("error", (err) => {
        console.error(err);
        process.exit(1);
      })
      .listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
      });
  })
  .catch((err) => {
    console.error("Error during app preparation:", err);
    process.exit(1);
  });
