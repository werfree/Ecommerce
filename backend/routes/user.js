const express = require("express");
const router = express.Router();

const { getUserById, getUser } = require("../controllers/user");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

//router.get("/users", getAllUsers);

router.put("/user/:userId", isSignedIn, isAuthenticated);
module.exports = router;
