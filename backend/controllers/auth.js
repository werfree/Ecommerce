const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");

//  SignUp

exports.signup = (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.errors[0].msg
    });
  }
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: err,
        errcode: err.code,
        errmsg: err.errmsg
      });
    }
    return res.status(200).json({
      name: user.name,
      email: user.email,
      id: user._id
    });
  });
};

// SignIn
exports.signin = (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.errors[0].msg
    });
  }
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User email not found"
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match."
      });
    }

    // create token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_CODE);

    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send respond to front end
    const { _id, email, name, role } = user;

    return res.status(200).json({
      token,
      user: { _id, name, email, role }
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "User Sign out"
  });
};
