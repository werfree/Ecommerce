const express = require("express");
const router = express.Router();

const {
  getToken,
  processPayment
} = require("../controllers/payment/braintree");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);

router.get(
  "/payment/braintree/gettoken/:userId",
  isSignedIn,

  getToken
);
router.post(
  "/payment/braintree/:userId",
  isSignedIn,
  isAuthenticated,
  processPayment
);

module.exports = router;
