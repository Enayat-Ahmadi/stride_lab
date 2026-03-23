import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function SearchForm() {
  const router = useRouter();
  const [search, setSearch] = useState(router.query.search || "");
  function handleSerach(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSerach} className="flex">
      <Input
        type="text"
        name="search"
        id="search"
        placeholder="search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button type="submit" variant="fhost">
        search
      </Button>
    </form>
  );
}
