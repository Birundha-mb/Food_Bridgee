require("dotenv").config();
const express = require("express");

const statsRoutes = require("./routes/statsRoutes");

const mongoose = require("mongoose");

const cors = require("cors");

const http = require("http");

const { Server } = require("socket.io");

const authRoutes = require("./routes/authRoutes");

const donationRoutes = require("./routes/donationRoutes");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {

  cors: {
    origin: "http://localhost:5173",
  },

});

global.io = io;

app.use(cors());

app.use(express.json());

app.use(
  "/uploads",
  express.static("uploads")
);

mongoose.connect(
  "mongodb://127.0.0.1:27017/foodbridge"
)
.then(() => {

  console.log("MongoDB Connected");

})
.catch((err) => {

  console.log(err);

});

app.use("/api/auth", authRoutes);

app.use(
  "/api/donations",
  donationRoutes
);

app.use("/api/stats", statsRoutes);

io.on("connection", (socket) => {

  console.log("User Connected");
  socket.on(
  "sendMessage",
  (data) => {

    io.emit(
  "receiveMessage",
  data
);

  }
);
socket.on(
  "sendNotification",
  (data) => {

    io.emit(
      "notification",
      data
    );

  }
);

});

server.listen(5000, () => {

  console.log(
    "Server running on 5000"
  );

});
