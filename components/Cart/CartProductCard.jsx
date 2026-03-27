import Image from "next/image";
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
    <div className="flex gap-6 rounded-2xl border p-5 shadow-sm card-hover">
      <div className="relative h-45 w-40 shrink-0 overflow-hidden rounded-xl">
        <Image
          src={product.images?.[0]}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-muted-foreground">{product.brand}</p>
          <p className="text-sm">Price: € {product.price}</p>
          <p className="text-sm">Size: {product.size}</p>
        </div>

        <div className="mt-3 flex items-center gap-3 rounded-full border w-fit px-4 py-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => decreaseQuantity(product._id)}
          >
            -
          </Button>
          <span>{product.quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => increaseQuantity(product._id)}
          >
            +
          </Button>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="font-semibold">Total € {total.toFixed(2)}</p>

          <Button
            className="text-muted-foreground hover:text-red-500"
            variant="ghost"
            size="icon"
            onClick={() => removeFromCart(product._id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
