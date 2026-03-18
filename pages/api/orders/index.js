import dbConnect from "@/db/connect";
import Order from "@/db/models/Order";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "POST") {
    try {
      const newOrder = await req.body;
      await Order.create({ newOrder });
      res.status(201).json({ status: "Order created successfully" });
      return;
    } catch (error) {
      console.error;
      res.status(400).json({ status: error.message });
      return;
    }
  }
  res.status(405).json({ status: "Method not allowed" });
  return;
}
