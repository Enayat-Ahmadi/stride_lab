import useCart from "@/hooks/useCart";
import CartProductCard from "@/components/Cart/CartProductCard";

export default function Cart({ products }) {
  const { productCart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  const cartProducts =
    productCart
      .map((item) => {
        const product = products.find((product) => product._id === item.id);
        if (!product) return null;
        return {
          ...product,
          quantity: item.quantity,
        };
      })
      .filter(Boolean) || [];

  return (
    <div className="min-h-screen p-5">
      {cartProducts.map((product) => (
        <CartProductCard
          key={product._id}
          product={product}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeFromCart={removeFromCart}
        />
      ))}
    </div>
  );
}
