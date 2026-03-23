import Link from "next/link";
import { ShoppingCart, Heart, Menu, X, Search } from "lucide-react";
import { useRouter } from "next/router";
import useWishlist from "@/hooks/useWishlist";
import useCart from "@/hooks/useCart";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useState } from "react";
import SearchOverly from "../SearchOverly";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Men", href: "/products?gender=men", gender: "men" },
  { label: "Women", href: "/products?gender=women", gender: "women" },
  { label: "Kids", href: "/products?gender=kids", gender: "kids" },
];
export default function Navbar({ products }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { pathname, query } = router;
  const { wishlist } = useWishlist();
  const { productCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <>
      <nav className="border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
            <Link href="/" className="text-xl font-bold">
              SNEAK<span className="italic text-lime-400">ify</span>
            </Link>
          </div>
          <div className="hidden gap-6 lg:flex">
            {navItems.map((item) => {
              const active = isActive(item);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative text-sm font-medium transition",
                    active
                      ? "text-destructive font-semibold"
                      : "text-gray-500 hover:text-black",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute w-full left-0 bottom-0 h-0.5 bg-destructive transition",
                      active ? "opacity-100" : "opacity-0",
                    )}
                  />
                </Link>
              );
            })}
          </div>

          <div className="flex gap-6">
            <Search onClick={() => setOpen(true)} />
            {/* Search form */}
            {open && (
              <div className="fixed inset-0 z-50 bg-white p-6">
                <Button
                  variant="ghost"
                  onClick={() => setOpen(false)}
                  className="absolute right-19 z-30"
                >
                  Cancel
                </Button>
                <SearchOverly products={products} />
              </div>
            )}
            <div className="relative">
              <Link href="/wishlist">
                <Heart className="w-7 h-7" />
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-white">
                  {wishlist.length}
                </span>
              </Link>
            </div>
            <div className="relative">
              <Link href="/cart">
                <ShoppingCart className="w-7 h-7" />
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-white">
                  {totalItems}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* Mobile  Menu*/}

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[80%] max-w-sm bg-white p-6 shadow-xl">
            <div className="mb-8 flex items-center justify-between">
              <Link
                href="/"
                className="text-xl font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                SNEAK<span className="italic text-lime-400">ify</span>
              </Link>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex flex-col gap-5">
              {navItems.map((item) => {
                const active = isActive(item);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "relative text-sm font-medium transition",
                      active
                        ? "text-destructive font-semibold"
                        : "text-gray-500 hover:text-black",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
