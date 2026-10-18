import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "white"
  | "teal"
  | "ghost-dark";
export type ButtonSize = "md" | "lg";

const base =
  "group relative inline-flex select-none items-center justify-center gap-2 rounded-full font-semibold tracking-snug transition-[transform,background-color,box-shadow,border-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform active:translate-y-0 active:scale-[0.985]";

const sizes: Record<ButtonSize, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-[0.975rem]",
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-700 text-white shadow-soft hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-lift",
  secondary:
    "border border-line-strong bg-white/60 text-ink-800 hover:-translate-y-0.5 hover:border-brand-300 hover:bg-white hover:text-brand-700 hover:shadow-soft",
  white:
    "bg-white text-brand-800 shadow-soft hover:-translate-y-0.5 hover:bg-mist hover:shadow-lift",
  teal:
    "bg-teal-600 text-white shadow-soft hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-lift",
  "ghost-dark":
    "border border-white/30 bg-white/5 text-white backdrop-blur-sm hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/15",
};

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Show a trailing arrow that nudges on hover. */
  withArrow?: boolean;
};

type ButtonAsLink = CommonProps & {
  href: string;
  /** Open in a new tab (external links). */
  external?: boolean;
};

type ButtonAsButton = CommonProps & {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-label"?: string;
  onClick?: () => void;
};

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    withArrow = false,
  } = props;

  const classes = cn(base, sizes[size], variants[variant], className);

  const inner = (
    <>
      <span className="relative z-[1]">{children}</span>
      {withArrow ? (
        <ArrowRight
          aria-hidden="true"
          className="relative z-[1] size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
        />
      ) : null}
    </>
  );

  if (props.href !== undefined) {
    const { href, external } = props;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  const { type = "button", disabled, "aria-label": ariaLabel, onClick } = props;
  return (
    <button
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(classes, disabled && "cursor-not-allowed opacity-70")}
    >
      {inner}
    </button>
  );
}
