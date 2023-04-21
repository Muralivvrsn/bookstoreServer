const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connect } = require("./database/connection");
const app = express();
require("dotenv").config();
connect();

app.use(express.json());

app.use(cors());
app.use(cookieParser());
app.use("/bookstore", require("./routers/api"));

app.listen(4000, () => {
  console.log("Listening");
});
