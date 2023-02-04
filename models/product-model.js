import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
  },
  mrp: {
    type: Number,
    required: true,
  },
  sellingPrice: {
    type: Number,
    required: true,
  },
  mainImage: {
    type: String,
    required: true,
  },
  allImages: {
    type: Array,
  },
  variant: {
    type: Object,
  },
  category: {
    type: String,
    required: true,
  },
  highlights: {
    type: Array,
  },
  rating: {
    type: Object,
  },
});
const productModel = mongoose.model("Product", productSchema);
export default productModel;
