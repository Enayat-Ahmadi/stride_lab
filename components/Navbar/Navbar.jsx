import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { useRouter } from "next/router";
import useWishlist from "@/hooks/useWishlist";
import useCart from "@/hooks/useCart";

const navItems = [
  { label: "Home", href: "/" },
  //   { label: "Products", href: "/products" },
];
export default function Navbar() {
  const { wishlist } = useWishlist();
  const { productCart } = useCart();

  const router = useRouter();
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      <Link href="/" className="text-xl font-bold">
        Sneakify
      </Link>

      <div className="flex gap-6">
        {navItems.map((item) => {
          const isActive = router.pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`transition ${
                isActive
                  ? "text-black font-semibold border-b-2 border-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="flex gap-6">
        <div className="relative">
          <Link href="/wishlist">
            <Heart className="w-9 h-9" />
            <span className="absolute bg-amber-500 rounded-full h-5 w-5 text-center text-white top-4 right-0">
              {wishlist.length}
            </span>
          </Link>
        </div>
        <div className="relative">
          <Link href="/cart">
            <ShoppingCart className="w-9 h-9" />
            <span className="absolute bg-amber-500 rounded-full h-5 w-5 text-center text-white top-4 right-0">
              {productCart.length}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
