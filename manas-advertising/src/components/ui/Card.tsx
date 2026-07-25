import { cn } from "@/lib/cn";
import { HTMLAttributes } from "react";

export function Card({
  className,
  hover = true,
  ...props
}: HTMLAttributes<HTMLDivElement> & { hover?: boolean }) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-black/5 bg-white/80 p-8 shadow-[0_8px_30px_rgba(11,27,51,0.04)] backdrop-blur-md transition-all duration-500",
        hover &&
          "hover:scale-[1.02] hover:border-[var(--color-accent)]/50 hover:shadow-[0_0_40px_rgba(var(--color-accent-rgb),0.15)]",
        className
      )}
      {...props}
    >
      {/* Subtle shine effect on hover */}
      {hover && (
        <div className="pointer-events-none absolute -inset-full z-0 block h-[200%] w-[200%] -rotate-45 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-1000 group-hover:opacity-100 mix-blend-overlay translate-x-[-100%] group-hover:animate-shine" />
      )}
      <div className="relative z-10">{props.children}</div>
    </div>
  );
}
