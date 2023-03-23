import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name must be provided"],
  },
  price: {
    type: Number,
    required: [true, "Product price must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    // use this to control the request sent by the client
    enum: {
      values: ["ikea", "liddy", "marcos", "caressa"],
      message: "{VALUES} is not supported",
    },
    // generic enums
    // enum: ["ikea", "liddy", "marcos", "caressa"],
  },
});
const Products = mongoose.model("Product", productSchema);
export default Products;
