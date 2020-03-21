const express = require("express");
const router = express.Router();

const { getProductByID, createProduct } = require("../controllers/product");
const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {} = require("../controllers/category");

// Middlewares
router.param("userId", getUserById);
router.param("productId", getProductByID);

// Routes
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

module.exports = router;
