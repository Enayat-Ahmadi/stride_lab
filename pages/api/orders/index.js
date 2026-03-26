import dbConnect from "@/db/connect";
import Order from "@/db/models/Order";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "GET") {
    try {
      const orders = await Order.find().sort({createdAt: -1});
      res.status(200).json(orders);
      return;
    } catch (error) {
      res.status(500).json({ status: error.message });
      return;
    }
  } else if (req.method === "POST") {
    try {
      const newOrder = req.body;
      const order = await Order.create(newOrder);
      res.status(201).json({ status: "Order created successfully", order });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: error.message });
      return;
    }
  }
  res.status(405).json({ message: "Method not allowed" });
  return;
}
