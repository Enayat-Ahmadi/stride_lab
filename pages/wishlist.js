import ProductsList from "@/components/ProductCard/ProductsList";
import useWishlist from "@/hooks/useWishlist";

export default function WishList({ products }) {
  const { wishlist } = useWishlist();
  const wishlistProducts =
    products?.filter((product) => wishlist.includes(product._id)) || [];

  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <ProductsList products={wishlistProducts} />
    </div>
  );
}
