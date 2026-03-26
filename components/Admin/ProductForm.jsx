import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const defaultValues = {
  name: "",
  price: "",
  brand: "",
  stock: 0,
  category: "",
  gender: "",
  description: "",
  sizes: "",
  images: "",
};

export default function ProductForm({
  initialData = defaultValues,
  onSubmit,
  isEditing = false,
  loading = false,
}) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    price: initialData.price || "",
    brand: initialData.brand || "",
    stock: initialData.stock ?? 0,
    category: initialData.category || "",
    gender: initialData.gender || "",
    description: initialData.description || "",
    sizes: Array.isArray(initialData.sizes) ? initialData.sizes.join(", ") : "",
    images: Array.isArray(initialData.images)
      ? initialData.images.join(", ")
      : "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const productData = {
        name: formData.name.trim(),
        price: Number(formData.price),
        brand: formData.brand.trim(),
        stock: Number(formData.stock),
        category: formData.category.trim(),
        gender: formData.gender,
        description: formData.description.trim(),

        sizes: formData.sizes
          .split(",")
          .map((s) => Number(s.trim()))
          .filter(Boolean),

        images: formData.images
          .split(",")
          .map((img) => img.trim())
          .filter(Boolean),
      };

      // 🔥 validation (important)
      if (
        !productData.name ||
        !productData.price ||
        !productData.brand ||
        !productData.gender ||
        !productData.description
      ) {
        throw new Error("Please fill all required fields");
      }

      await onSubmit(productData);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Card className="mx-auto max-w-2xl rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Product" : "Create Product"}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              name="name"
              placeholder="Product name"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              name="brand"
              placeholder="Brand"
              value={formData.brand}
              onChange={handleChange}
            />
            <Input
              name="price"
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
            />
            <Input
              name="stock"
              type="number"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              name="category"
              placeholder="Category (Running, Casual...)"
              value={formData.category}
              onChange={handleChange}
            />

            <Select
              value={formData.gender}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  gender: value,
                }))
              }
              className="h-14 rounded-md border px-3 text-sm"
            >
              <SelectTrigger className="w-full h-10">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="men">Men</SelectItem>
                  <SelectItem value="women">Women</SelectItem>
                  <SelectItem value="kids">Kids</SelectItem>
                  <SelectItem value="unisex">Unisex</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Textarea
            name="description"
            placeholder="Product description"
            value={formData.description}
            onChange={handleChange}
          />

          <Input
            name="images"
            placeholder="Image URLs (comma separated)"
            value={formData.images}
            onChange={handleChange}
          />
          <Input
            name="sizes"
            placeholder="Sizes (e.g. 38, 39, 40)"
            value={formData.sizes}
            onChange={handleChange}
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-full btn-hover"
          >
            {loading
              ? isEditing
                ? "Updating..."
                : "Creating..."
              : isEditing
                ? "Update Product"
                : "Create Product"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
