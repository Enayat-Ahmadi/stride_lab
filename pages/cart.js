import useCart from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import CartProductCard from "@/components/Cart/CartProductCard";
import Link from "next/link";

export default function Cart({ products }) {
  const { productCart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  const cartProducts =
    productCart
      .map((item) => {
        const product = products?.find((product) => product._id === item.id);
        if (!product) return null;
        return {
          ...product,
          quantity: item.quantity,
        };
      })
      .filter(Boolean) || [];

  const totalPrice = cartProducts.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );

  if (cartProducts.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-5 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="text-muted-foreground">
          Looks like you have not added anything yet.
        </p>
        <Button size="lg" variant="">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl px-4 py-8 md:px-6">
      <div className="mb-8 space-y-1 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Bag</h1>
        <p className="text-muted-foreground">
          {cartProducts.length} item{cartProducts.length > 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.6fr_0.8fr]">
        <div className="space-y-4">
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

        <aside className="h-fit rounded-2xl border bg-white p-6 shadow-sm lg:sticky lg:top-24">
          <h2 className="mb-6 text-xl font-semibold">Order Summary</h2>

          <div className="space-y-4 text-sm font-semibold">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{totalPrice.toFixed(2)} €</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-green-600">Free</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated Tax</span>
              <span>—</span>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{totalPrice.toFixed(2)} €</span>
              </div>
            </div>
          </div>

          <button className="mt-6 w-full rounded-full bg-black py-4 text-lg font-semibold text-white transition hover:bg-neutral-800">
            Checkout
          </button>

          <p className="mt-4 text-xs text-muted-foreground">
            Shipping, discounts and taxes calculated at checkout.
          </p>
        </aside>
      </div>
    </div>
  );
}
