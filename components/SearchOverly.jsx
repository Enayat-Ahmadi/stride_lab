import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/router";
import { Search } from "lucide-react";

export default function SearchOverly({ products }) {
  const router = useRouter();
  const [search, setSearch] = useState(router.query.search || "");
  const query = search.toLocaleLowerCase().trim();
  const result = query
    ? products.filter((product) =>
        product.name.toLocaleLowerCase().includes(query),
      )
    : [];
  function handleSerach(e) {
    e.preventDefault();
    if (!query) return;
    router.push({
      pathname: "/products",
      query: {
        ...router.query,
        search: query,
      },
    });
  }
  function handleProductClick(productId) {
    router.push(`/${productId}`);
  }
  return (
    <div className="mx-auto max-w-2xl">
      <form onSubmit={handleSerach} className="relative flex">
        <Input
          type="text"
          name="search"
          id="search"
          placeholder="search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-10 rounded-full border px-4 py-3 text-lg outline-none"
        />
        <button
          type="submit"
          variant="ghost"
          className="absolute right-2 top-2"
        >
          <Search />
        </button>
      </form>
      <div className="mt-4 space-y-2">
        {query &&
          result.slice(0, 5).map((product) => (
            <button
              key={product._id}
              type="button"
              onClick={() => handleProductClick(product._id)}
              className="block w-full rounded-xl border p-3 text-left hover:bg-neutral-100"
            >
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-neutral-500">{product.brand}</p>
            </button>
          ))}
      </div>
    </div>
  );
}
