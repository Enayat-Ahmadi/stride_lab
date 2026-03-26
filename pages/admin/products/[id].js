import { useRouter } from "next/router";
import useSWR from "swr";
import ProductForm from "@/components/Admin/ProductForm";
import ErrorScreen from "@/components/ui/ErrorScreen";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function AdminProductDetailsPage() {
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
    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to update product");
    }
    await mutate(`/api/products/${id}`);
    await mutate("/api/products");
    router.push("/admin/products");
  }
  return (
    <main>
      Product id :{id}
      <ProductForm
        onSubmit={handleUpdate}
        initialData={product}
        isEditing="true"
      />
    </main>
  );
}
