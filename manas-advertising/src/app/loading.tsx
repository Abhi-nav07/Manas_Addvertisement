import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--color-primary)] px-6">
      <Skeleton className="h-8 w-64 bg-white/10" />
      <Skeleton className="h-4 w-96 bg-white/10" />
      <Skeleton className="h-4 w-80 bg-white/10" />
    </div>
  );
}
