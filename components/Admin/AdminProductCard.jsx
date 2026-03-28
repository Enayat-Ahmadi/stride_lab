import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DeleteConfirmModal from "../ui/DeleteConfirmModal";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function AdminProductCard({ product, onDelete }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);
      await onDelete(product._id);
      setOpen(false);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Card className="card-hover">
      <CardContent className="p-4 md:p-6">
        {/* MOBILE */}
        <div className="space-y-4 md:hidden">
          <div className="flex gap-4">
            <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-muted">
              <Image
                src={product.images?.[0] || "/hero.jpg"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 space-y-1">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.brand}</p>
              <p className="text-sm text-muted-foreground">
                {product.category}
              </p>
              <p className="text-sm font-medium">€ {product.price}</p>
              <p
                className={cn(
                  product.stock < 5 && "text-amber-300",
                  product.stock === 0 && "text-red-700",
                  product.stock > 5 && "text-muted-foreground",
                )}
              >
                Stock: {product.stock > 0 ? product.stock : "Out of stock"}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Link href={`/admin/products/${product._id}`} className="flex-1">
              <Button variant="outline" className="w-full rounded-full">
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </Link>

            <Button
              variant="destructive"
              className="rounded-full"
              onClick={() => setOpen(true)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <DeleteConfirmModal
          open={open}
          onOpenChange={setOpen}
          onConfirm={handleDelete}
          title="Delete product"
          description={`Are you sure you want to delete "${product.name}"? This action cannot be undone.`}
          loading={loading}
        />
        {/* DESkTOP */}
        <div className="hidden items-center gap-4 md:grid md:grid-cols-[1.5fr_1fr_1fr_0.8fr_0.8fr_0.8fr]">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-muted">
              <Image
                src={product.images?.[0] || "/hero.jpg"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-xs text-muted-foreground">
                ID: {product._id.slice(-6).toUpperCase()}
              </p>
            </div>
          </div>

          <div className="text-sm">{product.brand}</div>

          <div className="text-sm capitalize">{product.category}</div>

          <div className="text-sm font-medium">${product.price}</div>

          <div
            className={cn(
              "text-sm",
              product.stock < 5 && "text-amber-600",
              product.stock === 0 && "text-red-600",
              product.stock > 5 && "text-muted-foreground",
            )}
          >
            Stock: {product.stock > 0 ? product.stock : "Out of stock"}
          </div>

          <div className="flex justify-end gap-2">
            <Link href={`/admin/products/${product._id}`}>
              <Button size="icon" variant="outline" className="rounded-full">
                <Pencil className="h-4 w-4" />
              </Button>
            </Link>

            <Button
              size="icon"
              variant="destructive"
              className="rounded-full"
              onClick={() => setOpen(true)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
