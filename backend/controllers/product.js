const Product = require("../models/product");

exports.getProductByID = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: "Product Not Found"
      });
    }
    res.product = product;
    next();
  });
};

exports.createProduct = (req, res) => {};

exports.updateProduct = (req, res) => {
  //
};
exports.deleteProduct = (req, res) => {
  //
};
