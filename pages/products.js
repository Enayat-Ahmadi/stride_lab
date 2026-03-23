import { Button } from "@/components/ui/button";
import ProductsList from "@/components/ProductCard/ProductsList";
import { useMemo } from "react";
import { useRouter } from "next/router";

export default function Products({ products }) {
  const router = useRouter();
  const { gender } = router.query;
  const filteredProducts = useMemo(() => {
    if (!gender) return products;
    if (gender === "kids") {
      return products.filter((product) =>
        product.sizes.some((size) => size <= 38),
      );
    }

    return products.filter((product) => product.gender === gender);
  }, [products, gender]);
  return (
    <div className="min-h-screen w-full flex flex-col items-center p-5">
      <ProductsList products={filteredProducts} />
    </div>
  );
}
