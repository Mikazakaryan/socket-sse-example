const app = require("express")();
const server = require("http").createServer(app);
const socketIo = require("socket.io");

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  let counter = 0;
  console.log("connection", socket.id);

  setInterval(() => {
    console.log("sent counter ", counter);
    socket.emit("counterUpdate", counter);
    ++counter;
  }, 1000);

  socket.on("counterUpdate", (newCounter) => {
    counter = newCounter;
  });
});

server.listen(3000);
