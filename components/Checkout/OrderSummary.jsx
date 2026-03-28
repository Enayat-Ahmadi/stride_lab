import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";

export default function OrderSummary({ cartProducts }) {
  const subtotal = useMemo(() => {
    return cartProducts.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0,
    );
  }, [cartProducts]);
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          {cartProducts.length === 0 ? (
            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
          ) : (
            cartProducts.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between gap-4"
              >
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Qtuantity: {product.quantity}
                  </p>
                </div>
                <p className="font-medium">
                  {formatCurrency(product.price * product.quantity)}
                </p>
              </div>
            ))
          )}
        </div>

        <Separator />

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between text-base font-semibold">
          <span>Total</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
