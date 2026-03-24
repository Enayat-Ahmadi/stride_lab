export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div className="animate-pulse">
        <h1 className="text-4xl font-extrabold tracking-[0.3em]">SNEAKIFY</h1>
      </div>

      <div className="mt-6 h-1 w-40 overflow-hidden rounded-full bg-gray-200">
        <div className="h-full w-1/2 animate-[loading_1.2s_ease-in-out_infinite] rounded-full bg-black"></div>
      </div>
    </div>
  );
}