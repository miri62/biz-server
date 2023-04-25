const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const register = require("./routes/register");
const login = require("./routes/login");
const cards = require("./routes/cards");
const myprofile= require("./routes/myprofile")
const app = express();
const cors = require("cors");

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/cards", cards);
app.use("/api/myprofile", myprofile);

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(() => console.log("MongoDB failed"));

app.listen(port, () => console.log(`Server started on port ${port}`));
