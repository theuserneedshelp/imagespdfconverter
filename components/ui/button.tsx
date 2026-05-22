import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
};

/**
 * Reusable button with consistent focus rings and motion.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant = "secondary", size = "md", type = "button", ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50",
          size === "md" && "min-h-11 px-4 py-2 text-sm",
          size === "lg" && "min-h-14 px-6 py-3 text-base",
          variant === "primary" &&
            "bg-accent text-accent-foreground shadow-soft hover:brightness-110 active:scale-[0.99]",
          variant === "secondary" &&
            "border border-line bg-surface text-ink shadow-sm hover:border-ink-faint hover:shadow-soft",
          variant === "ghost" &&
            "border border-transparent text-ink-muted hover:bg-surface-muted hover:text-ink",
          className,
        )}
        {...props}
      />
    );
  },
);
