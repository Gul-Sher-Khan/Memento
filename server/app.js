const express = require("express");
const app = express();
const dbconnect = require("./database/db_connect");
const notes = require("./routes/notes_router");
const cors = require("cors");
require("dotenv").config();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/notes", notes);

const start = async () => {
  try {
    await dbconnect(process.env.MONGO_URI);
    app.listen(3000, console.log("server is listening on port 3000..."));
  } catch (error) {
    console.log(error);
  }
};

start();
