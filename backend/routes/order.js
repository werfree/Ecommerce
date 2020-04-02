const express = require("express");
router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {
  getUserById,
  pushOrderInPurchasedList
} = require("../controllers/user");

const { updateStock } = require("../controllers/product");

const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateOrder
} = require("../controllers/order");

// Params
router.get("orderId", getOrderById);
router.get("userId", getUserById);

//Create
router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchasedList,
  updateStock,
  createOrder
);
router.post("/order/create/:userId", (req, res) => {
  console.log(req.body);
  res.send("Hii");
});

router.get("/order", (req, res) => {
  console.log("order");
  res.send(200);
});

//Status of order

router.get(
  "/order/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);
router.put(
  "/order/:orderId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateOrder
);

module.exports = router;
