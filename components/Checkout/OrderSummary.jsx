import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    <div>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-3">
            {cartProducts.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Your cart is empty.
              </p>
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
                    € {(product.price * product.quantity).toFixed(2)}
                  </p>
                </div>
              ))
            )}
          </div>

          <Separator />

          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>€ {subtotal.toFixed(2)}</span>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-base font-semibold">
            <span>Total</span>
            <span>€ {subtotal.toFixed(2)}</span>
          </div>

          {/* <Button
            type="submit"
            className="w-full rounded-xl"
            size="lg"
            disabled={cartProducts.length === 0}
          >
            Place Order
          </Button> */}
        </CardContent>
      </Card>
    </div>
  );
}
