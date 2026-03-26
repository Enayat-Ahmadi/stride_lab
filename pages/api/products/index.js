import dbConnect from "@/db/connect";
import Product from "@/db/models/Product";

const handler = async (req, res) => {
  await dbConnect();
  if (req.method === "GET") {
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      res.status(200).json(products);
      return;
    } catch (error) {
      res.status(500).json(error.message);
      return;
    }
  } else if (req.method === "POST") {
    try {
      const newProduct = req.body;
      const product = await Product.create(newProduct);
      res.status(201).json({ status: "Product created successfully", product });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: error.message });
      return;
    }
  }
  res.status(405).json({ status: "Method not allowed" });
  return;
};

export default handler;
