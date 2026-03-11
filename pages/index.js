import { Geist, Geist_Mono } from "next/font/google";
import Card from "@/components/ProductCard/Card";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home({ products, error, isLoading }) {
  if (isLoading) return <h3>isLoading...</h3>;
  if (error) return <h3>error</h3>;
  console.log(products);
  return (
    <div
      className={`${geistSans.className} ${geistMono.className}min-h-screen w-full flex flex-col items-center justify-center font-sans p-10 sm:px-2`}
    >
      <main className="min-h-screen max-w-6xl grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-10">
        {products.map((product) => {
          return <Card key={product._id} product={product} />;
        })}
      </main>
    </div>
  );
}
