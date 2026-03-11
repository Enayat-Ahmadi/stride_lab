import dbConnect from "@/db/connect";
import Product from "@/db/models/Product";

const handler = async (req, res) => {
  await dbConnect();
  if (req.method === "GET") {
    try {
      const products = await Product.find();
      res.status(200).json(products);
      return;
    } catch (error) {
      res.status(404).json(error.message);
      return;
    }
  }
  res.status(405).json({ status: "Method not allowed" });
  return;
};

export default handler;
