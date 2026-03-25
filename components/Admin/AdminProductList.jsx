import AdminProductCard from "./AdminProductCard";

export default function AdminProductsList({ products }) {
  return (
    <ul className="flex flex-col gap-4">
      {products?.map((product) => {
        return (
          <li key={product._id}>
            <AdminProductCard product={product} />
          </li>
        );
      })}
    </ul>
  );
}
