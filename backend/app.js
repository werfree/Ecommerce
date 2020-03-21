const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = express.Router();

//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

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

//Backend Connection
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
