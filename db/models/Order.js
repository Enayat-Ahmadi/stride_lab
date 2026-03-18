import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    customer: {
      fullname: { type: String, required: true },
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
        name: { type: string, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      default: "pending",
    },
  },
  { tiemstamps: true },
);
const Order = models.Order || model("Order", orderSchema);
export default Order;
