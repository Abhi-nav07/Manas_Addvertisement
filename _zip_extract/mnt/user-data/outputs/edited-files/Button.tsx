import { cn } from "@/lib/cn";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variants: Record<Variant, string> = {
  primary:
    "relative overflow-hidden bg-[var(--color-accent)] text-[var(--color-primary)] hover:shadow-lg hover:shadow-[var(--color-accent)]/30 group",
  secondary:
    "relative overflow-hidden bg-[var(--color-primary)] text-white hover:shadow-lg hover:shadow-[var(--color-primary)]/40 group",
  outline:
    "relative overflow-hidden border border-white/30 text-white hover:border-white/80 group",
  ghost: "relative overflow-hidden text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 group",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-500 ease-out active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          variants[variant],
          className
        )}
        aria-disabled={props.disabled}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2 transition-transform duration-500 group-hover:scale-105">{props.children}</span>
        {variant !== 'ghost' && (
          <span className="absolute inset-0 z-0 bg-white/20 translate-y-full rounded-full transition-transform duration-500 ease-out group-hover:translate-y-0" />
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

