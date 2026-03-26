import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AdminOrderCard({ order }) {
  return (
    <Link href={`/admin/orders/`}>
      <Card className="cursor-pointer rounded-2xl transition hover:shadow-md hover:scale-[1.01]">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <span>Order #{order._id.slice(-6).toUpperCase()}</span>
            <Badge
              variant={
                order.status === "pending"
                  ? "secondary"
                  : order.status === "paid"
                    ? "default"
                    : order.status === "shipped"
                      ? "outline"
                      : "destructive"
              }
              className="capitalize"
            >
              {order.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <p className="text-muted-foreground">Customer</p>
            <p className="font-medium">{order.customer.fullName}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Payment</p>
            <p className="capitalize">{order.payment?.method || "N/A"}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Total</p>
            <p className="font-semibold text-base">${order.totalAmount}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Date</p>
            <p>{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Items</p>
            <p className="line-clamp-1">
              {order.items.map((item) => item.name).join(", ")}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
