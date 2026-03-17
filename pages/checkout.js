import CheckoutForm from "@/components/Checkout/CheckoutForm";
import OrderSummary from "@/components/Checkout/OrderSummary";
import useCart from "@/hooks/useCart";
import { useRouter } from "next/router";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Checkout({ products }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { productCart, clearCart } = useCart();
  const cartProducts = productCart
    ?.map((item) => {
      const product = products?.find((product) => product._id === item.id);
      if (!product) return null;

      return {
        ...product,
        quantity: item.quantity,
      };
    })
    .filter(Boolean);

  function handleOrder(e) {
    e.preventDefault();
    if (loading || cartProducts.length === 0) return;

    setLoading(true);
    const formData = new FormData(e.target);
    const customerInfo = Object.fromEntries(formData);
    const order = {
      customer: customerInfo,
      products: cartProducts,
    };
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      clearCart?.();

      setTimeout(() => {
        router.push("/order-success");
      }, 1500);
    }, 1500);
  }
  return (
    <div className="px-4 py-8 md:px-8 grid mx-auto max-w-7xl gap-6 lg:grid-cols-3">
      <div className="lg:order-2 h-fit lg:sticky lg:top-24">
        <OrderSummary cartProducts={cartProducts} />
      </div>
      <form
        id="checkout-form"
        onSubmit={handleOrder}
        className="flex flex-col gap-4 lg:col-span-2"
      >
        <CheckoutForm />
        <Button
          type="submit"
          className="w-full rounded-xl"
          size="lg"
          disabled={loading || success || cartProducts.length === 0}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </span>
          ) : success ? (
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Order Placed
            </span>
          ) : (
            "Place Order"
          )}
        </Button>
      </form>
    </div>
  );
}
