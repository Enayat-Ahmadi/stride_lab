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
  } else if (req.method === "DELETE") {
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json({ message: "Products deleted successfully" });
      return;
    } catch (error) {
      res.status(400).json({ error: "Product not found" });
      return;
    }
  } else if (req.method === "PUT") {
    const newProduct = req.body;
    try {
      const updateProduct = await Product.findByIdAndUpdate(id, newProduct, {
        new: true,
        runValidators: true,
      });
      if (!updateProduct) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
      res.status(200).json({
        message: "Product updated successfully",
        product: updateProduct,
      });
      return;
    } catch (error) {
      console.error("Put error: ", error);
      res.status(500).json({ message: "Failed to update product" });
      return;
    }
  }
  res.status(405).json({ status: "Method not allowed" });
  return;
};
export default handler;
