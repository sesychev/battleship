import { wss as websocketServer } from "./src/websocket/websocket";
import { httpServer } from "./src/http_server/index";

const HTTP_PORT = 8181;

console.log(
  `Start Static server http://localhost:${HTTP_PORT} on the port ${HTTP_PORT}!`
);

httpServer.listen(HTTP_PORT);

websocketServer;
