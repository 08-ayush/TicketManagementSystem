const express = require("express");
const connectDB = require("./db/connectdb.js");
const ticketRouter = require("./routes/ticketRoute.js");
const chatRouter = require("./routes/chatRoute.js");
const UserRouter = require("./routes/userRoute.js");
const AdminRouter = require("./routes/adminRoute.js");
const ResolverRouter = require("./routes/resolverRoute.js");
const session = require("express-session");
const multer = require("multer");

//Socket.IO
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//Session
app.use(
  session({
    secret: "tms",
    resave: false,
    saveUninitialized: false,
  })
);

// Multer
const multerStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + "/uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: multerStorage });

// Mongo DB
const URL =
    "mongodb+srv://aayushchauhan008:123456780@cluster0.vzxgzg4.mongodb.net/?retryWrites=true&w=majority";
  // "mongodb+srv://aayushchauhan008:123456789a@cluster0.tnnrpui.mongodb.net/?retryWrites=true&w=majority";

connectDB.connectDB(URL);
console.log("Server connected");

// Middlewares
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.render("dashboard");
});

app.get("/getUserRole", function (req, res) {
  if (req.session.isUser) {
    res.status(200).json({ role: "user" });
  } else if (req.session.isResolver) {
    res.status(200).json({ role: "resolver" });
  }
});

app.use(express.json());

app.use(upload.single("chatImg"));
app.use(express.static("uploads"));

// Routes
app.use("/ticket", ticketRouter.router);
app.use("/chat", chatRouter.router);
app.use("/userlogin", UserRouter.router);
app.use("/adminlogin", AdminRouter.router);
app.use("/resolver", ResolverRouter.router);

//Server
server.listen(3000, () => {
  console.log(`Server is running on : http://localhost:3000 `);
});

//SocketIO Talks
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", { role: msg.user, message: msg.message });
  });
});
