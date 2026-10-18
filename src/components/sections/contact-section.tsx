import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { ContactForm } from "./contact-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Mail, MessageSquareReply, ShieldCheck } from "lucide-react";

export function ContactSection({
  dict,
  locale,
  preselectedService,
}: {
  dict: Dictionary;
  locale: Locale;
  preselectedService?: string | null;
}) {
  const points = [
    {
      icon: MessageSquareReply,
      title:
        locale === "da" ? "Hurtig tilbagemelding" : "Quick response",
      description:
        locale === "da"
          ? "Vi svarer på din henvendelse, så snart vi har mulighed for det."
          : "We reply to your enquiry as soon as we are able to.",
    },
    {
      icon: Mail,
      title:
        locale === "da" ? "Skræddersyet tilbud" : "Tailored quote",
      description:
        locale === "da"
          ? "Tilbuddet tager udgangspunkt i opgavens omfang og dine behov."
          : "The quote is based on the scope of the task and your needs.",
    },
    {
      icon: ShieldCheck,
      title: locale === "da" ? "Fortrolighed" : "Confidentiality",
      description:
        locale === "da"
          ? "Dine oplysninger bruges kun til at besvare din henvendelse."
          : "Your details are only used to respond to your enquiry.",
    },
  ];

  return (
    <section
      id={locale === "da" ? "kontakt" : "contact"}
      className="surface-paper relative scroll-mt-24 overflow-hidden border-t border-line py-20 sm:py-24 lg:py-32"
      aria-labelledby="contact-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 size-80 rounded-full bg-teal-100/40 blur-3xl"
      />

      <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 xl:gap-20">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow={dict.contact.eyebrow}
            title={dict.contact.heading}
            description={dict.contact.intro}
            align="left"
            id="contact-heading"
          />

          <ul className="flex flex-col gap-5">
            {points.map(({ icon: Icon, title, description }) => (
              <Reveal
                key={title}
                as="li"
                className="flex items-start gap-4"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-700 shadow-soft ring-1 ring-inset ring-line">
                  <Icon className="size-5" strokeWidth={1.9} aria-hidden="true" />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="font-bold text-ink-900">{title}</span>
                  <span className="text-sm text-ink-600 text-pretty">
                    {description}
                  </span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.1}>
          <div className="relative rounded-[1.75rem] border border-line bg-white p-6 shadow-lift sm:p-8 lg:p-10">
            <ContactForm
              dict={dict}
              locale={locale}
              preselectedService={preselectedService}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
