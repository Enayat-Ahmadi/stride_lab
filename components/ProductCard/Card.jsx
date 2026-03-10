import Image from "next/image";

const Card = ({ product }) => {
  return (
    <div className="group rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="relative  h-64 overflow-hidden bg-gray-100">
        <div className="absolute top-3 left-3 z-10 bg-black text-white text-xs px-2 py-1 rounded-full">
          New
        </div>

        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover h-200 w-200 transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <p className="text-sm text-gray-500">{product.brand}</p>
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="mt-2 text-base font-bold">${product.price}</p>

        <button className="mt-4 w-full rounded-xl bg-black text-white py-2 font-medium hover:opacity-90 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default Card;
