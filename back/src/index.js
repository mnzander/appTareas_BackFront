const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = 9000;

const app = express();
app.use(express.json());
app.use(cors());

require("dotenv").config();

const usersRouter = require("./routers/usersRouter");
const tasksRouter = require("./routers/tasksRouter");

//Conexion a MONGO
console.log("Connecting to MongoDB with URL:", process.env.DATABASE_URL_DEV);
mongoose.connect(process.env.DATABASE_URL_DEV);
const db = mongoose.connection;

db.on("error", (error) => {
    console.log(`Error al conectar con Mongo ${error}`);
})

db.on("connected", () => {
    console.log("Success connection");
  });
  
db.on("disconnected", () => {
console.log("Mongo is disconnected");
});
  
app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);

app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
});