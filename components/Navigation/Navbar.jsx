import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { useRouter } from "next/router";
import useWishlist from "@/hooks/useWishlist";
import useCart from "@/hooks/useCart";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Men", href: "/products?gender=men", gender: "men" },
  { label: "Women", href: "/products?gender=women", gender: "women" },
  { label: "Kids", href: "/products?gender=kids", gender: "kids" },
];
export default function Navbar() {
  const router = useRouter();
  const { pathname, query } = router;
  const { wishlist } = useWishlist();
  const { productCart } = useCart();
  const totalItems = productCart.reduce(
    (sum, Product) => sum + Product.quantity,
    0,
  );

  function isActive(item) {
    if (item.href === "/") {
      return pathname === "/";
    }
    return pathname === "/products" && query.gender === item.gender;
  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      <Link href="/" className="text-xl font-bold">
        Sneakify
      </Link>

      <div className="flex gap-6">
        {navItems.map((item) => {
          const active = isActive(item);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative text-sm font-medium transition",
                active
                  ? "text-amber-500 font-semibold"
                  : "text-gray-500 hover:text-black",
              )}
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
              {totalItems}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
