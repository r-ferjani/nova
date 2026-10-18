"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import { AlertCircle, CheckCircle2, Loader2, Lock, Send } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale, ServiceKey } from "@/i18n/config";
import { serviceOrder } from "@/i18n/config";
import { pageHref } from "@/i18n/paths";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

type SubmitState = "idle" | "success" | "error";

type ContactFormProps = {
  dict: Dictionary;
  locale: Locale;
  preselectedService?: string | null;
};

export function ContactForm({
  dict,
  locale,
  preselectedService,
}: ContactFormProps) {
  const t = dict.contact.form;
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [notConfigured, setNotConfigured] = useState(false);

  const schema = useMemo(
    () =>
      z.object({
        name: z
          .string()
          .min(1, t.validation.nameRequired)
          .min(2, t.validation.nameMin),
        email: z
          .string()
          .min(1, t.validation.emailRequired)
          .email(t.validation.emailInvalid),
        phone: z.string().optional(),
        service: z.string().min(1, t.validation.serviceRequired),
        customerType: z.enum(["private", "business"]),
        postalCode: z.string().optional(),
        message: z
          .string()
          .min(1, t.validation.messageRequired)
          .min(10, t.validation.messageMin),
        website: z.string().optional(),
      }),
    [t],
  );

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service:
        preselectedService &&
        serviceOrder.includes(preselectedService as ServiceKey)
          ? preselectedService
          : "",
      customerType: "private",
      postalCode: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitState("idle");
    setNotConfigured(false);

    try {
      const response = await fetch(`/api/contact?locale=${locale}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setSubmitState("success");
        reset();
        return;
      }

      if (response.status === 503) {
        setNotConfigured(true);
      }
      setSubmitState("error");
    } catch {
      setNotConfigured(false);
      setSubmitState("error");
    }
  });

  if (submitState === "success") {
    return <SuccessCard dict={dict} onReset={() => setSubmitState("idle")} />;
  }

  if (submitState === "error") {
    return (
      <ErrorCard
        dict={dict}
        notConfigured={notConfigured}
        onRetry={() => setSubmitState("idle")}
      />
    );
  }

  const serviceOptions = serviceOrder.map((key) => ({
    value: key,
    label: t.serviceOptions[key],
  }));

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-6"
      aria-labelledby="contact-form-heading"
    >
      <h3 id="contact-form-heading" className="sr-only">
        {dict.contact.heading}
      </h3>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldShell
          id="name"
          label={t.name}
          required
          error={errors.name?.message}
        >
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Mads Hansen"
            aria-required="true"
            className={inputClass(!!errors.name)}
            {...register("name")}
          />
        </FieldShell>

        <FieldShell
          id="email"
          label={t.email}
          required
          error={errors.email?.message}
        >
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="mads@eksempel.dk"
            aria-required="true"
            className={inputClass(!!errors.email)}
            {...register("email")}
          />
        </FieldShell>

        <FieldShell id="phone" label={`${t.phone} (${t.optional})`}>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+45 12 34 56 78"
            className={inputClass(false)}
            {...register("phone")}
          />
        </FieldShell>

        <FieldShell id="postalCode" label={`${t.postalCode} (${t.optional})`}>
          <input
            id="postalCode"
            type="text"
            autoComplete="postal-code"
            placeholder="1000"
            className={inputClass(false)}
            {...register("postalCode")}
          />
        </FieldShell>
      </div>

      <FieldShell
        id="service"
        label={t.service}
        required
        error={errors.service?.message}
      >
        <select
          id="service"
          aria-required="true"
          className={cn(inputClass(!!errors.service), selectClass)}
          style={{ backgroundImage: chevronSvg }}
          {...register("service")}
        >
          <option value="" disabled>
            {t.servicePlaceholder}
          </option>
          {serviceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FieldShell>

      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-3 text-sm font-semibold text-ink-800">
          {t.customerType}
        </legend>
        <div className="grid grid-cols-2 gap-3">
          {(["private", "business"] as const).map((value) => {
            const label =
              value === "private"
                ? t.customerTypePrivate
                : t.customerTypeBusiness;
            return (
              <label
                key={value}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border bg-white px-4 py-3 text-sm font-semibold shadow-sm transition-all duration-300 has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50 has-[:checked]:text-brand-800",
                  errors.customerType
                    ? "border-red-300"
                    : "border-line hover:border-brand-300",
                )}
              >
                <input
                  type="radio"
                  value={value}
                  defaultChecked={value === "private"}
                  className="size-4.5 accent-brand-700"
                  aria-describedby={
                    errors.customerType ? "customerType-error" : undefined
                  }
                  {...register("customerType")}
                />
                {label}
              </label>
            );
          })}
        </div>
        {errors.customerType ? (
          <p
            id="customerType-error"
            role="alert"
            className="mt-2 flex items-center gap-1.5 text-sm font-medium text-red-600"
          >
            <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
            {errors.customerType.message}
          </p>
        ) : null}
      </fieldset>

      <FieldShell
        id="message"
        label={t.message}
        required
        error={errors.message?.message}
      >
        <textarea
          id="message"
          rows={5}
          aria-required="true"
          className={cn(inputClass(!!errors.message), "resize-y")}
          {...register("message")}
        />
      </FieldShell>

      {/* Honeypot — invisible to people, tempting to bots. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden"
      >
        <label htmlFor="website">{t.honeypotLabel}</label>
        <input
          id="website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
          {...register("website")}
        />
      </div>

      <div className="flex flex-col gap-4">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              {t.submitting}
            </>
          ) : (
            <>
              <Send className="size-4" aria-hidden="true" />
              {t.submit}
            </>
          )}
        </Button>

        <p className="flex items-start gap-2 text-sm text-ink-500">
          <Lock
            className="mt-0.5 size-4 shrink-0 text-teal-600"
            aria-hidden="true"
          />
          <span>
            {t.privacyNote}{" "}
            <Link
              href={pageHref("privacy", locale)}
              className="font-semibold text-brand-700 underline decoration-brand-300 underline-offset-2 transition-colors hover:text-teal-700"
            >
              {dict.footer.privacyLink}
            </Link>
          </span>
        </p>
      </div>
    </form>
  );
}

function inputClass(hasError: boolean): string {
  return cn(
    "w-full rounded-xl border bg-white px-4 py-3 text-ink-900 shadow-sm outline-none transition-all duration-300 placeholder:text-ink-400",
    "focus:border-brand-400 focus:ring-4 focus:ring-brand-100",
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
      : "border-line hover:border-line-strong",
  );
}

const selectClass =
  "appearance-none bg-[length:1.25rem] bg-[right_0.85rem_center] bg-no-repeat pr-11";

const chevronSvg =
  "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none' stroke='%2358717e' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m5 7.5 5 5 5-5'/%3E%3C/svg%3E\")";

function FieldShell({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-ink-800">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-1 text-teal-600">
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1.5 text-sm font-medium text-red-600"
        >
          <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SuccessCard({
  dict,
  onReset,
}: {
  dict: Dictionary;
  onReset: () => void;
}) {
  return (
    <Reveal className="flex flex-col items-center gap-5 rounded-3xl border border-teal-200 bg-teal-50/60 p-8 text-center sm:p-10">
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="inline-flex"
      >
        <span className="inline-flex size-16 items-center justify-center rounded-full bg-teal-600 text-white shadow-glow">
          <CheckCircle2 className="size-8" strokeWidth={2.2} aria-hidden="true" />
        </span>
      </motion.span>
      <h3 className="text-title font-semibold text-ink-950">
        {dict.contact.form.successTitle}
      </h3>
      <p className="max-w-md text-pretty text-ink-600">
        {dict.contact.form.successText}
      </p>
      <Button variant="secondary" size="md" onClick={onReset}>
        {dict.contact.form.successButton}
      </Button>
    </Reveal>
  );
}

function ErrorCard({
  dict,
  notConfigured,
  onRetry,
}: {
  dict: Dictionary;
  notConfigured: boolean;
  onRetry: () => void;
}) {
  return (
    <Reveal className="flex flex-col items-center gap-5 rounded-3xl border border-red-200 bg-red-50/70 p-8 text-center sm:p-10">
      <span className="inline-flex size-16 items-center justify-center rounded-full bg-red-100 text-red-600">
        <AlertCircle className="size-8" strokeWidth={2.2} aria-hidden="true" />
      </span>
      <h3 className="text-title font-semibold text-ink-950">
        {dict.contact.form.errorTitle}
      </h3>
      <p className="max-w-md text-pretty text-ink-600">
        {notConfigured
          ? dict.contact.form.errorNotConfigured
          : dict.contact.form.errorText}
      </p>
      <Button variant="secondary" size="md" onClick={onRetry}>
        {dict.contact.form.retryButton}
      </Button>
    </Reveal>
  );
}
