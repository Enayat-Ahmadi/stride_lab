import AdminProductCard from "@/components/Admin/AdminProductCard";
export default function AdminProductPage({ products }) {
  return (
    <main className="min-h-screen bg-background px-4 py-8 md:px-8">
      {products.map((product) => (
        <AdminProductCard key={product._id} product={product} />
      ))}
    </main>
  );
}
