import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/router";
import { Search, X } from "lucide-react";
import EmptyState from "./ui/EmpatyState";

export default function SearchOverly({ products, onClose }) {
  const router = useRouter();
  const [search, setSearch] = useState(router.query.search || "");
  const query = search.toLocaleLowerCase().trim();
  const result = query
    ? products.filter(
        (product) =>
          product.name.toLocaleLowerCase().includes(query) ||
          product.brand?.toLowerCase().includes(query) ||
          product.category?.toLowerCase().includes(query),
      )
    : [];
  function handleSerach(e) {
    e.preventDefault();
    if (!query) return;

    onClose();
    router.push({
      pathname: "/products",
      query: {
        ...router.query,
        search: query,
      },
    });
  }
  function handleProductClick(productId) {
    onClose();
    router.push(`/products/${productId}`);
  }
  function clearSearch() {
    setSearch("");
  }
  return (
    <div className="max-w-3xl min-h-screen mx-auto rounded-2xl border glass">
      <div className="relative max-w-2xl mx-auto">
        <form onSubmit={handleSerach} className="relative flex w-full">
          <Input
            type="text"
            name="search"
            id="search"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 rounded-full border bg-card/60 px-4 py-3 text-lg text-black pl-9 mt-3 placeholder:text-primary"
          />
          <button
            type="submit"
            variant="ghost"
            className="absolute left-3 top-6"
          >
            <Search />
          </button>
        </form>
        <button
          onClick={search ? clearSearch : onClose}
          className="absolute right-3 top-6"
        >
          <X />
        </button>
      </div>
      {query && result?.length === 0 && (
        <EmptyState
          title="No results found"
          message="Try another keyword or filter."
          actionLabel="Back to shop"
          actionHref="/products"
        />
      )}
      <div className="max-w-2xl mx-auto flex flex-col mt-4 gap-3">
        {query &&
          result.slice(0, 5).map((product) => (
            <div
              key={product._id}
              type="button"
              onClick={() => handleProductClick(product._id)}
              className="rounded-xl border p-3 text-left bg-card/60 card-hover"
            >
              <p className="font-medium">{product.name}</p>
              <p className="text-sm">{product.brand}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
