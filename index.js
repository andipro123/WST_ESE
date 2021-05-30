const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");

const Product = require("./Schema/Product");
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
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

// app.get("/", function (req, res) {
//   res.render("home");
// });

router.post("/add", function (req, res) {
  console.log(req.body);
  if (!req.body) {
    return res.status(400).send({
      message: "Product details content can not be empty",
    });
  }

  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    expiry: req.body.date,
  });

  product
    .save()
    .then((data) => {
      res.redirect("/");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the product.",
      });
    });
});

router.get("/", (req, res) => {
  Product.find()
    .then((p) => {
      console.log(p);
      res.render("home", { products: p });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving product.",
      });
    });
});

router.post("/search", (req, res) => {
  Product.findOne({ name: req.body.name })
    .then((p) => {
      console.log(p);
      res.render("home", { products: p });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving product.",
      });
    });
});

router.post("/delete/:name", (req, res) => {
  Product.deleteOne({ name: req.body.name })
    .then((p) => {
      console.log(p);
      res.render("home");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving product.",
      });
    });
});

app.use("/", router);

app.listen(port, function () {
  console.log("server is running on port" + port);
});
