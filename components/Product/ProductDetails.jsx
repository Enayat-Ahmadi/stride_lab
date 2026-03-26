import Image from "next/image";
import { Heart } from "lucide-react";
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
import { useState } from "react";

export default function ProductDetails({ product }) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart, success } = useCart();
  const [selectedImage, setSelectedImage] = useState(product.images?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeAlert, setSizeAlert] = useState(false);

  function handleAddToCart() {
    if (!selectedSize) {
      setSizeAlert(true);
      return;
    }

    addToCart(product._id, selectedSize);
    setSizeAlert(false);
  }

  return (
    <Card className="mx-auto max-w-6xl overflow-hidden">
      {success && <SuccessMessage message="Product added to shopping cart!" />}
      <CardContent className="grid md:grid-cols-2 gap-8 p-6">
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted ">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-cover card-hover"
            />
          </div>
          <div className="grid grid-cols-4 gap-3 ">
            {product.images?.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`relative aspect-square overflow-hidden rounded-xl border ${
                  selectedImage === image ? "border-black" : "border-muted"
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover card-hover"
                />
              </button>
            ))}
          </div>
        </div>
        {/* DETAILS */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <Badge variant="secondary">{product.brand}</Badge>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-2xl font-semibold">{product.price} €</p>
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => toggleWishlist(product._id)}
                className="rounded-full w-9 h-9"
              >
                {isWishlisted(product._id) ? (
                  <Heart className="text-red-700 fill-red-600 rounded-full w-7 h-7" />
                ) : (
                  <Heart className="w-7 h-7" />
                )}
              </Button>
            </div>

            <p className="text-sm leading-6 text-muted-foreground">
              {product.description}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Select Size</p>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {product.sizes?.map((size) => (
                  <Button
                    key={size}
                    type="button"
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                    className="h-12 card-hover"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
            {!selectedSize && sizeAlert && (
              <p className="text-red-500 text-lg">Please select a size</p>
            )}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                onClick={handleAddToCart}
                className="h-12 rounded-full btn-hover font-semibold "
              >
                Add to Cart
              </Button>
            </div>
            <div className="space-y-2 rounded-2xl bg-muted p-4 text-sm">
              <p>Free delivery on orders over 100 €</p>
              <p>30 days return policy</p>
              <p>Secure checkout</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
