import AdminProductsList from "@/components/Admin/AdminProductList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
export default function AdminProductPage({ products }) {
  return (
    <main className="min-h-screen bg-background px-4 py-8 md:px-8">
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
      <AdminProductsList products={products} />
    </main>
  );
}
