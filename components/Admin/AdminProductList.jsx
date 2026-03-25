import AdminProductCard from "./AdminProductCard";

export default function AdminProductsList({ products, onDelete }) {
  return (
    <ul className="flex flex-col gap-4">
      {products?.map((product) => {
        return (
          <li key={product._id}>
            <AdminProductCard product={product} onDelete={onDelete} />
          </li>
        );
      })}
    </ul>
  );
}
