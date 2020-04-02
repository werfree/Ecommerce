const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = express.Router();
require("dotenv").config();

// Variables
const app = express();
const PORT = process.env.PORT || 8000;

// My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const braintree = require("./routes/braintree");

// DB connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB is Connected");
  })
  .catch(err => {
    console.error("DB CONNECTION ERROR", err);
  });

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Routers
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", braintree);

app.get("/", (req, res) => {
  res.send("Tshirt");
});

//Backend Connection
app.listen(PORT, "192.168.31.118", () => {
  console.log(`App is running at ${PORT}`);
});
