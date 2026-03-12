import { useRouter } from "next/router";
import useSWR from "swr";
import ProductDetails from "@/components/ProductCard/ProductDetails";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Details() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: product,
    error,
    isLoading,
  } = useSWR(id ? `/api/products/${id}` : null, fetcher);
  if (error) return <p>error</p>;
  if (isLoading) return <p>isLoading...</p>;

  return (
    <div className="h-screen p-5">
      <ProductDetails product={product} />
    </div>
  );
}
