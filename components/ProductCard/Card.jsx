import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProductCard({ product }) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
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
        <CardDescription>{product.price} $</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full" size="lg">
          Add to Wishlist
        </Button>
        <Button className="w-full" size="lg">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
