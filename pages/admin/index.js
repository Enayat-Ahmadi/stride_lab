import Link from "next/link";

const navItems = [
  { label: "Products", href: "/admin/products" },
  { label: "Orders", href: "/admin/orders" },
];

export default function AdminPanel() {
  return (
    <main className="max-w-6xl min-h-screen mx-auto mt-2 overflow-hidden rounded-2xl border bg-card">
      <div className="flex gap-5 justify-around mt-5">
        <h1 className="text-2xl font-semibold text-center">Admin Panel</h1>
        <div>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
