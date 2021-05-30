const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const Product = require("./Schema/Product");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

mongoose
  .connect("mongodb://localhost:27017/dairy", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.get("/", function (req, res) {
  res.render("home");
});

app.post("/add", function (req, res) {
  if (!req.body.content) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }
});

app.listen(port, function () {
  console.log("server is running on port" + port);
});
