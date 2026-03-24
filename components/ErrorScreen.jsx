export default function ErrorScreen({ message = "Something went wrong" }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
      <h1 className="text-6xl font-extrabold text-black">404</h1>

      <h2 className="mt-4 text-2xl font-semibold">Oops 👟</h2>

      <p className="mt-2 text-gray-500">
        {message}
      </p>

      <div className="mt-6 text-5xl animate-bounce">👟</div>

      <button
        onClick={() => window.location.href = "/"}
        className="mt-6 rounded-full bg-black px-6 py-3 text-white transition hover:bg-neutral-800"
      >
        Back to Home
      </button>
    </div>
  );
}