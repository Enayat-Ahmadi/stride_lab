import Image from "next/image";
import {
  CardContent,
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useWishlist from "@/hooks/useWishlist";
import useCart from "@/hooks/useCart";
import SuccessMessage from "../ui/SuccessMessage";

export default function ProductDetails({ product }) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart, success } = useCart();
  return (
    <Card className="mx-auto max-w-5xl overflow-hidden">
      {success && <SuccessMessage message="Product added to shopping cart!" />}
      <CardContent className="grid md:grid-cols-2 gap-8 p-6">
        <div className="relative aspect-square w-full">
          <Image
            src={product.images?.[0]}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <Badge variant="secondary">{product.brand}</Badge>
            <CardTitle className="text-3xl font-bold">{product.name}</CardTitle>
            <p className="text-2xl font-semibold text-primary">
              € {product.price}
            </p>
            <CardDescription>{product.description}</CardDescription>
            <div className="flex flex-wrap gap-2">
              {product.sizes?.map((size) => (
                <Badge key={size} variant="outline">
                  EU {size}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              size="lg"
              className="flex-1"
              onClick={() => addToCart(product._id)}
            >
              Add to Cart
            </Button>
            <Button
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(product._id);
              }}
            >
              {isWishlisted(product._id)
                ? "remove from wishlist"
                : "Add to Wishlist"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
