import { useRouter } from "next/router";
import useSWR from "swr";
import ProductDetails from "@/components/ProductCard/ProductDetails";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ErrorScreen from "@/components/ui/ErrorScreen";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Details() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: product,
    error,
    isLoading,
  } = useSWR(id ? `/api/products/${id}` : null, fetcher);
  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <ErrorScreen
        title="Failed to load sneakers"
        message="Please refresh the page or come back in a moment."
      />
    );
  }

  return (
    <div className="min-h-screen p-5">
      <ProductDetails product={product} />
    </div>
  );
}
