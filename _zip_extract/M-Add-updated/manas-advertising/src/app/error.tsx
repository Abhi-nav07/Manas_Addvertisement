"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--color-primary)] px-6 text-center">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-[var(--color-accent)]/15 blur-[130px]" />
      </div>
      <div className="relative z-10 max-w-md">
        <h1 className="font-display text-3xl font-semibold text-white md:text-4xl">
          Something went wrong
        </h1>
        <p className="mt-4 text-white/60">
          We hit an unexpected error loading this page. You can try again, or
          head back to the homepage.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-[var(--color-primary)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary)]"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary)]"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
