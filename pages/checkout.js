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
        size: item.size,
      };
    })
    .filter(Boolean);
  console.log(cartProducts);

  async function handleOrder(e) {
    e.preventDefault();
    if (loading || cartProducts.length === 0) return;

    try {
      setLoading(true);
      const formData = new FormData(e.target);
      const order = {
        customer: {
          fullName: formData.get("fullname"),
          email: formData.get("email"),
          address: formData.get("address"),
          city: formData.get("city"),
          postalCode: formData.get("postalCode"),
        },
        items: cartProducts.map((product) => ({
          productId: product._id,
          name: product.name,
          price: Number(product.price),
          size: Number(product.size),
          quantity: Number(product.quantity),
        })),
        totalAmount: cartProducts.reduce(
          (sum, product) =>
            sum + Number(product.price) * Number(product.quantity),
          0,
        ),
      };
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.status || data.message || "Failed to create order",
        );
      }
      setSuccess(true);
      clearCart();
      console.log("Order saved:", data.order);
      router.push("/order-success");
    } catch (error) {
      console.error("Order error:", error);
    } finally {
      setLoading(false);
    }
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
