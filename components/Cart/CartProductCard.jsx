import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function CartProductCard({
  product,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) {
  const total = product.price * product.quantity;

  return (
    <Card className="rounded-2xl border">
      <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
        <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-muted">
          <Image
            src={product.images?.[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 space-y-1">
          <h3 className="text-base font-semibold">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.brand}</p>
          <p className="text-sm font-medium">${product.price}</p>
        </div>

        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <div className="flex items-center rounded-lg border">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => decreaseQuantity(product._id)}
            >
              -
            </Button>

            <span className="min-w-10 text-center text-sm font-medium">
              {product.quantity}
            </span>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => increaseQuantity(product._id)}
            >
              +
            </Button>
          </div>

          <p className="w-20 text-right font-semibold">${total}</p>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeFromCart(product._id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}