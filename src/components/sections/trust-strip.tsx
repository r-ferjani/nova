import {
  BadgeCheck,
  CalendarClock,
  SlidersHorizontal,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { StaggerGroup, StaggerItem } from "@/components/ui/reveal";

const trustIcons: LucideIcon[] = [
  BadgeCheck,
  CalendarClock,
  SlidersHorizontal,
  Users,
];

export function TrustStrip({ dict }: { dict: Dictionary }) {
  return (
    <section
      className="relative z-[2] -mt-6 px-4 pb-6 sm:px-6 lg:-mt-14 lg:pb-10"
      aria-label={dict.trust.title}
    >
      <div className="container-page px-0">
        <h2 className="sr-only">{dict.trust.title}</h2>
        <StaggerGroup>
          <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-lift">
            <ul className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
              {dict.trust.items.map((item, index) => {
                const Icon = trustIcons[index] ?? BadgeCheck;
                return (
                  <StaggerItem key={item.title} className="h-full">
                    <li className="flex h-full items-start gap-4 p-6 transition-colors duration-300 hover:bg-offwhite sm:p-7">
                      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-teal-50 text-brand-700 ring-1 ring-inset ring-line">
                        <Icon className="size-5" strokeWidth={1.9} aria-hidden="true" />
                      </span>
                      <span className="flex flex-col gap-1.5">
                        <span className="font-bold text-ink-950">{item.title}</span>
                        <span className="text-sm leading-relaxed text-ink-600 text-pretty">
                          {item.description}
                        </span>
                      </span>
                    </li>
                  </StaggerItem>
                );
              })}
            </ul>
          </div>
        </StaggerGroup>
      </div>
    </section>
  );
}
