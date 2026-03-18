import dbConnect from "@/db/connect";
import Order from "@/db/models/Order";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  try {
    const newOrder = req.body;
    const order = await Order.create(newOrder);
    res.status(201).json({ status: "Order created successfully", order });
    return;
  } catch (error) {
    console.error(error);
    res.status(400).json({ status: error.message });
    return;
  }
}
