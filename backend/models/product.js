const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      maxlength: 32
    },
    description: {
      type: String,
      trim: true,
      require: true
    },
    price: {
      type: Number,
      require: true,
      maxlength: 10,
      trim: true
    },
    category: {
      type: ObjectId,
      ref: "Category",
      require: true
    },
    stock: {
      type: Number
    },
    sold: {
      type: Number,
      default: 0
    },
    photo: {
      data: Buffer,
      contentType: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
