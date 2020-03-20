const express = require("express");
const app = express();

const port = 8000;

app.get("/", (req, res) => {
  res.send("HelloWorld");
});

const admin = (req, res) => {
  console.log("admin");
  res.send("Admin").status(400);
};

const isAdmin = (req, res, next) => {
  console.log("isAdmin is running");
  res.send("isAdmin");
  //next();
};

const isLoggedIN = (req, res, next) => {
  console.log("isLogged");
  next();
};
app.get("/admin", isLoggedIN, isAdmin, admin);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
