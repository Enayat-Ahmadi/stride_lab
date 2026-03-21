import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/hero2.jpg"
          alt="Sneakers hero"
          fill
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="relative mx-auto flex min-h-[80vh] max-w-7xl items-center px-4 py-20 md:px-8">
        <div className="max-w-2xl text-white">
          <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
            <span className="font-semibold">
              Sneak<span className="text-neutral-300">ify</span>
            </span>
          </div>

          <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">
            Step Into
            <span className="block text-neutral-300">Streetwear Style</span>
          </h1>

          <p className="mt-5 max-w-xl text-base text-white/80 md:text-lg">
            Discover modern sneakers for everyday wear, performance, and
            street-ready looks. Clean design, premium comfort, and styles that
            stand out.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
            >
              Shop Now
            </Link>

            <Link
              href="/products?gender=men"
              className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Explore Men
            </Link>

            <Link
              href="/products?gender=women"
              className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Explore Women
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-8 text-sm text-white/75">
            <div>
              <p className="text-2xl font-bold text-white">20+</p>
              <p>Curated Sneakers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">Top</p>
              <p>Streetwear Brands</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">Fast</p>
              <p>Shopping Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}