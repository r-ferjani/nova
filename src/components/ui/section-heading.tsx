import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Render a darker heading for use on coloured surfaces. */
  onDark?: boolean;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  onDark = false,
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "mx-auto max-w-2xl items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <span
            className={cn(
              "inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.16em]",
              onDark ? "text-teal-300" : "text-brand-700",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "h-px w-6",
                onDark ? "bg-teal-400/70" : "bg-brand-300",
              )}
            />
            {eyebrow}
          </span>
        </Reveal>
      ) : null}

      <Reveal delay={0.06}>
        <h2
          id={id}
          className={cn(
            "text-headline font-semibold text-balance",
            onDark ? "text-white" : "text-ink-950",
          )}
        >
          {title}
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "text-lead text-pretty",
              onDark ? "text-ink-100/80" : "text-ink-600",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
