import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DeleteConfirmModal from "../ui/DeleteConfirmModal";
import { useState } from "react";

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
        <div className="space-y-4 ">
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
              <p className="text-sm text-muted-foreground">
                Stock: {product.stock}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Link href={`/admin/products`} className="flex-1">
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
      </CardContent>
    </Card>
  );
}
