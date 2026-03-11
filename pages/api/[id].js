import dbConnect from "@/db/connect";
import Product from "@/db/models/Product";

const handler = async (req, res) => {
 
  await dbConnect();
  const { id } = req.query;
  if (req.method === "GET") {
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ status: "Product not found" });
      return;
    }
    res.status(200).json(product);
    return;
  }
  res.status(405).json({ status: "Method not allowed" });
  return;
};
export default handler;
