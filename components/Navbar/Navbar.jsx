import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { useRouter } from "next/router";

const navItems = [
  { label: "Home", href: "/" },
  //   { label: "Products", href: "/products" },
  //   { label: "Men", href: "/men" },
  //   { label: "Women", href: "/women" },
];
export default function Navbar() {
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

      <div className="flex gap-4">
        <Link href="/wishlist">
          <Heart className="w-6 h-6" />
        </Link>
        <Link href="/cart">
          <ShoppingCart className="w-6 h-6" />
        </Link>
      </div>
    </nav>
  );
}
