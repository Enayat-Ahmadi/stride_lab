import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    stock: { type: Number, default: 0 },
    category: { type: String },
    gender: { type: String, required: true },
    description: { type: String, required: true },
    sizes: [Number],
    images: [String],
  },
  {
    timestamps: true,
  },
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
