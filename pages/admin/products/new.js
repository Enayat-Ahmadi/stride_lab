import { useRouter } from "next/router";
import { useState } from "react";
import ProductForm from "@/components/admin/ProductForm";

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function handleCreate(productData) {
    setLoading(true);
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) {
      throw new Error(data.message || "Failed to create product");
    }
    router.push("/admin/products");
  }
  return (
    <main className="px-4 py-8 md:px-8">
      <ProductForm onSubmit={handleCreate} loading={loading} />
    </main>
  );
}
