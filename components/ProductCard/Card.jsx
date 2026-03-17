import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useWishlist from "@/hooks/useWishlist";
import useCart from "@/hooks/useCart";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProductCard({ product }) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart, success } = useCart();

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      {success && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-white shadow-lg">
          <span>Product added to shopping cart!</span>
        </div>
      )}
      <Image
        src={product.images?.[0]}
        alt={product.name}
        width={800}
        height={450}
        className="relative z-20 aspect-video w-full object-cover brightness-60  dark:brightness-40"
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{product.brand}</Badge>
        </CardAction>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.price} €</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col gap-2">
        <Button
          className="w-full"
          size="lg"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product._id);
          }}
        >
          {isWishlisted(product._id)
            ? "remove from wishlist"
            : "Add to Wishlist"}
        </Button>
        <Button
          className="w-full"
          size="lg"
          onClick={(e) => {
            e.preventDefault();
            addToCart(product._id);
          }}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
