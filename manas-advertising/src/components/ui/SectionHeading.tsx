import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <span
          className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent)]"
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-display text-[clamp(1.9rem,3.2vw,3rem)] font-semibold leading-[1.1]",
          light ? "text-white" : "text-[var(--color-primary)]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            light ? "text-white/70" : "text-neutral-500"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
