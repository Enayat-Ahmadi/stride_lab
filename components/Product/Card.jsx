import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useWishlist from "@/hooks/useWishlist";
import useCart from "@/hooks/useCart";
import { Heart } from "lucide-react";
import SuccessMessage from "../ui/SuccessMessage";

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
    <Card className="relative mx-auto w-full max-w-sm pt-0 card-hover">
      {success && <SuccessMessage message="Product added to shopping cart!" />}
      <Image
        src={product.images?.[0] || "/hero.jpg"}
        alt={product.name}
        width={800}
        height={450}
        className="relative z-20 aspect-video w-full object-cover brightness-60  dark:brightness-40 "
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{product.brand}</Badge>
        </CardAction>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.price} €</CardDescription>
      </CardHeader>
      <CardFooter className="flex gap-5 ">
        <Button
          className="w-[80%] h-9 rounded-2xl btn-hover"
          size=""
          onClick={(e) => {
            e.preventDefault();
            addToCart(product._id);
          }}
        >
          Add to Cart
        </Button>
        <button
          className="hover:cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product._id);
          }}
        >
          {isWishlisted(product._id) ? (
            <Heart className="text-red-700 fill-red-600 rounded-full w-7 h-7" />
          ) : (
            <Heart className="w-7 h-7" />
          )}
        </button>
      </CardFooter>
    </Card>
  );
}
