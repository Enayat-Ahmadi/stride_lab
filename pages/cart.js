import useCart from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import CartProductCard from "@/components/Cart/CartProductCard";
import Link from "next/link";
import EmptyState from "@/components/ui/EmpatyState";
import { formatCurrency } from "@/lib/utils";

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
          size: item.size,
        };
      })
      .filter(Boolean) || [];

  const totalPrice = cartProducts.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );
  const totalItems = cartProducts.reduce(
    (acc, product) => acc + product.quantity,
    0,
  );
  if (cartProducts.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        message="Looks like you haven’t added any sneakers yet."
      />
    );
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl px-4 py-8 md:px-6">
      <div className="mb-8 space-y-1 text-center border rounded-2xl flex items-center justify-center gap-5 bg-card p-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Your shopping Cart
          <span className="text-muted-foreground">
            {" "}
            {totalItems} item{totalItems > 1 ? "s" : ""}
          </span>
        </h1>
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
              <span>{formatCurrency(totalPrice)}</span>
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
                <span>{formatCurrency(totalPrice)}</span>
              </div>
            </div>
          </div>

          <Link href="/checkout">
            <Button
              size="lg"
              className="mt-6 h-12 rounded-full bg-black text-lg font-semibold btn-hover"
            >
              Checkout
            </Button>
          </Link>
          <p className="mt-4 text-xs text-muted-foreground">
            Shipping, discounts and taxes calculated at checkout.
          </p>
        </aside>
      </div>
    </div>
  );
}
