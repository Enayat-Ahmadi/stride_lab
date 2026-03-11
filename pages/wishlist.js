import { useLocalStorage } from "@uidotdev/usehooks";
import ProductsList from "@/components/ProductCard/ProductsList";

const WishList = ({ products }) => {
  const [WishList] = useLocalStorage("wishlist", []);
  const wishlistProducts =
    products?.filter((product) => WishList.includes(product._id)) || [];
  console.log(wishlistProducts);
  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <ProductsList products={wishlistProducts} />
    </div>
  );
};

export default WishList;
