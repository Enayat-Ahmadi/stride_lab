import useSWR from "swr";
import ErrorScreen from "@/components/ui/ErrorScreen";
import LoadingScreen from "@/components/ui/LoadingScreen";
import AdminOrderCard from "@/components/Admin/AdminOrderCard";

export default function Orders() {
  const { data, error, isLoading } = useSWR("/api/orders");
  if (error) return <ErrorScreen />;
  if (isLoading) return <LoadingScreen />;

  const orders = Array.isArray(data) ? data : [];
  return (
    <main className="max-w-6xl min-h-screen flex flex-col mx-auto gap-3 bg-background px-4 py-8 md:px-8">
      {orders.map((order) => (
        <AdminOrderCard key={order._id} order={order} />
      ))}
    </main>
  );
}
