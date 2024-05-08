import { Link } from "@remix-run/react";

export function Hero() {
  return (
    <section className="w-full bg-[#F5F5F5] py-12 dark:bg-[#1A1A1A] md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter text-[#333333] dark:text-[#F5F5F5] sm:text-5xl xl:text-6xl/none">
                Track Your Marijuana Experience
              </h1>
              <p className="max-w-[600px] text-[#666666] dark:text-[#CCCCCC] md:text-xl">
                Discover the perfect strains, dosages, and experiences tailored to your needs. Our
                app makes it easy to log, analyze, and optimize your cannabis journey.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-[#4CAF50] px-8 text-sm font-medium text-[#F5F5F5] shadow transition-colors hover:bg-[#43A047] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#388E3C] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#2E7D32] dark:text-[#F5F5F5] dark:hover:bg-[#1B5E20] dark:focus-visible:ring-[#1B5E20]"
                to="/sign-up"
              >
                Get Started
              </Link>
            </div>
          </div>
          <img
            alt="Hero"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
            height="550"
            src="/hero.jpeg"
            width="550"
          />
        </div>
      </div>
    </section>
  );
}
