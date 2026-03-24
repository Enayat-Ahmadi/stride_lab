import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    customer: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: Number, required: true },
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        size: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true },
);
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
