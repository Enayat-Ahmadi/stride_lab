import AdminProductsList from "@/components/Admin/AdminProductList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import useSWR from "swr";
import ErrorScreen from "@/components/ui/ErrorScreen";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function AdminProductPage() {
  const { data, error, isLoading, mutate } = useSWR("/api/products");
  if (error) return <ErrorScreen />;
  if (isLoading) return <LoadingScreen />;
  async function handleDelete(productId) {
    const response = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      mutate("/api/products");
    }
  }
  const products = Array.isArray(data) ? data : [];
  return (
    <main className="max-w-6xl min-h-screen flex flex-col mx-auto gap-3 bg-background px-4 py-8 md:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Products</h1>
          <p className="text-sm text-muted-foreground">
            Manage your store products, stock, and pricing.
          </p>
        </div>

        <Link href="/admin/products/new">
          <Button className="rounded-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border p-4 card-hover">
          <p className="text-sm text-muted-foreground">Total Products</p>
          <p className="text-2xl font-bold">{products.length}</p>
        </div>
        <div className="rounded-2xl border p-4 card-hover">
          <p className="text-sm text-muted-foreground">Low Stock</p>
          <p className="text-2xl font-bold">
            {
              products?.filter(
                (product) => product?.stock > 0 && product.stock <= 5,
              ).length
            }
          </p>
        </div>
        <div className="rounded-2xl border p-4 card-hover">
          <p className="text-sm text-muted-foreground">Out of Stock</p>
          <p className="text-2xl font-bold">
            {products?.filter((product) => product.stock === 0).length}
          </p>
        </div>
      </div>

      <AdminProductsList products={products} onDelete={handleDelete} />
    </main>
  );
}
