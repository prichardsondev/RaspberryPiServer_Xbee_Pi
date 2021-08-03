const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { origins: "*:*" });
const path = require("path");
require("./src/serial/xbeeSerial")(io);
const xbeeSerial = require("./src/serial/xbeeSerial");
const { radios } = require("./src/radios/index");

app.use(express.static(path.join(__dirname, "public")));
app.use('/js', express.static(__dirname + '/node_modules/socket.io/client-dist'));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.get("Origin") || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization, Content-Type, X-Requested-With, Range"
  );
  if (req.method === "OPTIONS") {
    return res.send(200);
  } else {
    return next();
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});


io.on("connection", (socket) => {

  //send update when client connects
  Object.entries(radios).forEach(([k,v]) => 
    io.emit("update", { radio: k, "state": v.state }));

  //long had below - have to update code with each radio added.
  // io.emit("update", { radio: "bench", "state": radios.bench.state });
  // io.emit("update", { radio: "garage", "state": radios.garage.state });
  require("./src/radios")(socket, xbeeSerial);
});

const PORT = 3000;
server.listen(PORT, () => { console.log(`Listening on http://localhost:${PORT}`) });