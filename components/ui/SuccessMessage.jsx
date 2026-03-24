export default function SuccessMessage({message = ""}) {
  return (
    <div className="fixed top-12 right-5 z-50 flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-white shadow-lg">
      <span>{message}</span>
    </div>
  );
}
