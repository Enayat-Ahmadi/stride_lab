import { Button } from "@/components/ui/button";
import ProductsList from "@/components/ProductCard/ProductsList";
import { useMemo } from "react";
import { useRouter } from "next/router";
import EmptyState from "@/components/ui/EmpatyState";

export default function Products({ products }) {
  const router = useRouter();

  const search = router.query.search || "";
  const gender = router.query.gender || "";

  let filteredProducts = [...products];
  if (gender === "kids") {
    filteredProducts = filteredProducts.filter((product) =>
      product.sizes.some((size) => size <= 38),
    );
  } else if (gender) {
    filteredProducts = filteredProducts.filter(
      (product) => product.gender.toLowerCase() === gender.toLowerCase(),
    );
  }
  if (search.trim()) {
    const query = search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query),
    );
  }
  if (!filteredProducts || filteredProducts.length === 0) {
    return (
      <EmptyState
        title="No sneakers found"
        message="Try another category, search term, or check back for new arrivals."
      />
    );
  }
  return (
    <div className="min-h-screen w-full flex flex-col items-center p-5">
      <ProductsList products={filteredProducts} />
    </div>
  );
}
