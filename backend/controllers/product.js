const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fileSystem = require("fs");

exports.getProductByID = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: "Product Not Found",
        err
      });
    }
    req.product = product;
    next();
  });
};

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 20;
  let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err || !products) {
        res.status(400).json({
          error: "No product Found"
        });
      }
      res.json(products);
    });
};

// Get Product

exports.getProduct = (req, res) => {
  //console.log(req.product);
  req.product.photo = undefined;
  //console.log(req.product);
  return res.json(req.product);
};

// Get All Categories
exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err || !category) {
      res.status(400).json({
        error: "No category Found"
      });
    }
    res.json(category);
  });
};
// Create Product
exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Image not Uplaoded",
        err
      });
    }

    //destructure the fiellds
    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please Include All Fields"
      });
    }

    let product = new Product(fields);

    //handle file here

    if (file.photo) {
      if (file.photo.size > 3 * 1024 * 1024) {
        return res.status(400).json({
          error: "File size too big"
        });
      }
      product.photo.data = fileSystem.readFileSync(file.photo.path);
      console.log(file.photo.path);

      product.photo.contentType = file.photo.type;
    }
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product Upload Fail",
          err
        });
      }
      res.json(product);
    });
  });
};

// Update Product
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Update Fail",
        err
      });
    }

    //Updation File

    let product = req.product;
    product = _.extend(product, fields);

    //handle file here

    if (file.photo) {
      if (file.photo.size > 3 * 1024 * 1024) {
        return res.status(400).json({
          error: "File size too big"
        });
      }
      product.photo.data = fileSystem.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Updation Fail",
          err
        });
      }
      res.json(product);
    });
  });
  //
};

// Delete Product
exports.deleteProduct = (req, res) => {
  const products = req.product;
  Product.deleteOne({ _id: req.product.id }, (err, product) => {
    if (err) {
      return res.status(400).json({
        error: `${products.name} not deleted`,
        err
      });
    }
    console.log(products);
    return res.status(200).json({
      message: `${products.name} sucessfully deleted`
    });
  });
  //
};

//middleware

//  Get Photo
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

// Update Stock

exports.updateStock = (req, res, next) => {
  let myOperation = req.body.order.products.map(pro => {
    return {
      updateOne: {
        filter: { _id: pro._id },
        update: { $inc: { stock: -pro.count, sold: +pro.count } }
      }
    };
  });
  Product.bulkWrite(myOperation, {}, (err, products) => {
    if (err || !products) {
      return res.status(400).json({
        error: "Bulk Operation Failed"
      });
    }
    next();
  });
};
