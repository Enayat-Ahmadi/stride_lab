import { useEffect } from "react";
import { useRouter } from "next/router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OrderSuccess() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-xl rounded-2xl text-center">
        <CardHeader>
          <CardTitle className="text-2xl">
            Order placed successfully 🎉
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground">
            Redirecting to home in 3 seconds...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
