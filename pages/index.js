import { Geist, Geist_Mono } from "next/font/google";
import ProductsList from "@/components/ProductCard/ProductsList";
import HeroSection from "@/components/HeroSection";

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

  return (
    <div
      className={`${geistSans.className} ${geistMono.className}min-h-screen w-full flex flex-col items-center justify-center font-sans p-5`}
    >
      <main className="w-full">
        <HeroSection />
      </main>
    </div>
  );
}
