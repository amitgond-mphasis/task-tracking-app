const express = require("express");//importing file
const dotenv = require("dotenv");//importing file
const cors = require("cors");

const db = require("./config/db");//importing function from file 

const app = express();//importing file

dotenv.config({ path: "./config/config.env" });

app.use(cors());


// Database Connection
db(app); //passing parameters into the function imported above

app.use(express.json());  //using json
app.use(express.urlencoded({ extended: false }));


app.use("/api/v1", require("./routes/user"));   //entry point for api call



module.exports = app;