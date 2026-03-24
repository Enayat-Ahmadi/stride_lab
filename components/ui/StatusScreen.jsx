import Link from "next/link";
import Image from "next/image";

export default function StatusScreen({
  type = "loading",
  title,
  message,
  actionLabel,
  actionHref = "/products",
  fullScreen = true,
}) {
  const isLoading = type === "loading";
  const isError = type === "error";
  const isEmpty = type === "empty";

  return (
    <section
      className={`relative overflow-hidden bg-white text-black ${
        fullScreen ? "min-h-screen" : "min-h-[60vh]"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.06),transparent_40%)]" />
      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-black/5 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-black/5 blur-3xl" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mb-8">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-black/10 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
            {isLoading && (
              <>
                <div className="absolute inset-0 rounded-full border-2 border-black/10" />
                <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-black" />
                <span className="text-3xl">👟</span>
              </>
            )}

            {isError && <span className="text-4xl">!</span>}
            {isEmpty && (
              <span className="font-semibold">
                Sneak<span className="italic text-lime-400">ify</span>
              </span>
            )}
          </div>
        </div>

        <h1 className="max-w-2xl text-4xl font-black uppercase tracking-tight sm:text-5xl">
          {title ||
            (isLoading
              ? "Loading the next drop"
              : isError
                ? "Something went wrong"
                : "Nothing here yet")}
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-6 text-black/60 sm:text-base">
          {message ||
            (isLoading
              ? "We are preparing your sneakers, styles, and latest arrivals."
              : isError
                ? "We could not load this page right now. Please try again."
                : "No sneakers matched your search or this collection is still empty.")}
        </p>

        {isLoading && (
          <div className="mt-10 w-full max-w-xs">
            <div className="h-0.75 overflow-hidden rounded-full bg-black/10">
              <div className="h-full w-1/3 animate-[loadingBar_1.2s_ease-in-out_infinite] rounded-full bg-black" />
            </div>
          </div>
        )}

        {!isLoading && actionLabel && (
          <div className="mt-10">
            <Link
              href={actionHref}
              className="inline-flex items-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-neutral-800"
            >
              {actionLabel}
            </Link>
          </div>
        )}

        {!isLoading && (
          <div className="mt-14 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-black/10 bg-white p-5 text-left shadow-sm">
              <p className="text-xs uppercase tracking-[0.25em] text-black/40">
                Fast
              </p>
              <p className="mt-2 text-sm font-medium">
                Clean navigation and smooth shopping flow.
              </p>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-5 text-left shadow-sm">
              <p className="text-xs uppercase tracking-[0.25em] text-black/40">
                Premium
              </p>
              <p className="mt-2 text-sm font-medium">
                Minimal design inspired by modern sneaker brands.
              </p>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-5 text-left shadow-sm">
              <p className="text-xs uppercase tracking-[0.25em] text-black/40">
                Ready
              </p>
              <p className="mt-2 text-sm font-medium">
                Built for real product, cart, and checkout pages.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
