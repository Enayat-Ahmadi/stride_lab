import AdminProductsList from "@/components/Admin/AdminProductList";
export default function AdminProductPage({ products }) {
  return (
    <main className="min-h-screen bg-background px-4 py-8 md:px-8">
      <AdminProductsList products={products} />
    </main>
  );
}
