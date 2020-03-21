const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User Not Found"
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

exports.getAllUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err || !users) {
      return req.status(400).json({
        error: "No user in DB"
      });
    }
    res.status(200).json(users);
  });
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "Update not done"
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      return res.status(200).json(user);
    }
  );
};

exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err || !order) {
        return res.status(400).json({
          error: "No order for this User"
        });
      }
      return res.json(order);
    });
};

exports.pushOrderInPurchasedList = (req, res, next) => {
  let purchasesNew = [];
  req.body.order.products.forEach(product => {
    const { _id, name, description, category, quantity } = product;
    const amount = req.body.order.amount;
    const transaction_id = req.body.order.transaction_id;
    purchasesNew.push({
      _id,
      name,
      description,
      category,
      quantity,
      amount,
      transaction_id
    });
  });

  //Store this in DB

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchasesNew } },
    { new: true },
    (err, purchase) => {
      if (err || !purchase) {
        return res.status(400).json({
          error: "Unable to save Purchase List"
        });
      }
      next();
    }
  );
};
