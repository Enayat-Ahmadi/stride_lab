import Link from "next/link";
import { ShoppingCart, Heart, Menu, X, Search } from "lucide-react";
import { useRouter } from "next/router";
import useWishlist from "@/hooks/useWishlist";
import useCart from "@/hooks/useCart";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import SearchOverly from "../SearchOverly";
import Image from "next/image";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Men", href: "/products?gender=men", gender: "men" },
  { label: "Women", href: "/products?gender=women", gender: "women" },
  { label: "Kids", href: "/products?gender=kids", gender: "kids" },
];
const brands = [
  { label: "Nike", src: "/brands/nike.png", href: "/products?search=nike" },
  {
    label: "Adidas",
    src: "/brands/adidas.png",
    href: "/products?search=adidas",
  },
  {
    label: "New balance",
    src: "/brands/newbalance.png",
    href: "/products?search=new balance",
  },
];
export default function Navbar({ products }) {
  const [openSearch, setOpenSearch] = useState(false);
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

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className="border-b ">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
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
            <Search onClick={() => setOpenSearch(true)} className="btn-hover" />
            {openSearch && (
              <div className="fixed mx-auto inset-0 z-100 p-4">
                <div
                  className="absolute inset-0 bg-black/50"
                  onClick={() => setOpenSearch(false)}
                />
                <SearchOverly
                  products={products}
                  onClose={() => setOpenSearch(false)}
                />
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
            <button
              variant="ghost"
              className="lg:hidden z-50 w-6 h-7"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile  Menu*/}

      {mobileMenuOpen && (
        <div className="fixed w-full right-0 inset-0 z-30 overflow-hidde lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="absolute right-1 top-15 h-[90%] rounded-2xl max-w-sm glass p-6 shadow-xl">
            <div className="flex items-end  gap-5 mt-3 mr-2">
              {navItems.map((item) => {
                const active = isActive(item);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "relative text-sm transition px-4 py-2 rounded-lg card-hover bg-card/30 font-semibold",
                      active ? "text-destructive " : "text-muted",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="flex flex-col gap-3 mt-5">
              <p className="text-center text-muted">Trend Brands</p>
              {brands.map((brand) => (
                <Link
                  key={brand.href}
                  href={brand.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="
                    flex justify-between items-center p-4 h-14 text-sm font-semibold bg-card/30 text-muted transition overflow-hidde
                    rounded-2xl card-hover"
                >
                  {brand.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
