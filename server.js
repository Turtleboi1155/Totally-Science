import express from "express";
import { createBareServer } from "@titaniumnetwork-dev/ultraviolet";
import http from "http";

const app = express();
const server = http.createServer(app);
const bare = createBareServer("/bare/");

app.use(express.static("public"));

app.use("/uv/", (req, res) => {
  bare.routeRequest(req, res);
});

server.on("upgrade", (req, socket, head) => {
  if (req.url.startsWith("/uv/")) {
    bare.routeUpgrade(req, socket, head);
  }
});

server.listen(8080, () =>
  console.log("Proxy running on http://localhost:8080")
);
