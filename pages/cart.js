import useCart from "@/hooks/useCart";
import ProductsList from "@/components/ProductCard/ProductsList";

export default function Cart({ products }) {
  const { productCart } = useCart();

  const cartProducts = productCart.map((item) => {
    const product = products.find((product) => product._id === item.id);
    return {
      ...product,
      quantity: item.quantity,
    };
  });
console.log(cartProducts)
  return (
    <div className="min-h-screen p-5">
      <ProductsList products={cartProducts} />
    </div>
  );
}
