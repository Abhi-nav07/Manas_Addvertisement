import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="relative flex min-h-screen items-center overflow-hidden bg-[var(--color-primary)] pt-20"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-[var(--color-accent)]/15 blur-[130px]" />
        </div>
        <Container className="relative z-10 text-center">
          <span className="font-display text-[clamp(5rem,12vw,9rem)] font-semibold leading-none text-white/10">
            404
          </span>
          <h1 className="mt-2 font-display text-3xl font-semibold text-white md:text-4xl">
            This page went off-brief
          </h1>
          <p className="mx-auto mt-4 max-w-md text-white/60">
            The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s
            get you back on track.
          </p>
          <Link href="/" className="mt-8 inline-block">
            <Button variant="primary">Back to Home</Button>
          </Link>
        </Container>
      </main>
      <Footer />
    </>
  );
}
