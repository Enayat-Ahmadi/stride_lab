import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/router";
import Product from "@/db/models/Product";

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

  return (
    <div className="mx-auto max-w-2xl">
      <form onSubmit={handleSerach} className="flex">
        <Input
          type="text"
          name="search"
          id="search"
          placeholder="search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <div>
        {query &&
          result.slice(0, 5).map((product) => (
            <button key={product._id} type="button">
              <p>{product.name}</p>
            </button>
          ))}
      </div>
    </div>
  );
}
