import { useRouter } from "next/router";
import useSWR from "swr";
import ProductForm from "@/components/Admin/ProductForm";
import ErrorScreen from "@/components/ui/ErrorScreen";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { useState } from "react";

export default function AdminProductDetailsPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const {
    data: product,
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/products/${id}`);
  if (error) return <ErrorScreen />;
  if (isLoading) return <LoadingScreen />;

  async function handleUpdate(productData) {
    setLoading(true);
    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) {
      throw new Error(data.message || "Failed to update product");
    }
    await mutate(`/api/products/${id}`);
    await mutate("/api/products");
    router.push("/admin/products");
  }
  return (
    <main className="px-4 py-8 md:px-8">
      <ProductForm
        onSubmit={handleUpdate}
        initialData={product}
        isEditing="true"
        loading={loading}
      />
    </main>
  );
}
