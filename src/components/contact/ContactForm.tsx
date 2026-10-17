"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, AlertCircle, ChevronDown } from "lucide-react";
import { StatusPill } from "@/components/brand/StatusPill";
import { Button } from "@/components/brand/Button";
import { cn } from "@/lib/utils";
import { hasAnalyticsConsent, pushDataLayer } from "@/lib/consent";
import { getFirstTouch } from "@/lib/tracking/first-touch";

type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle: string;
  country: string;
  interest: string;
  heard_about: string;
  claimsVolume?: string;
  message?: string;
  consent: boolean;
};

const countryKeys = [
  "switzerland", "germany", "austria", "unitedKingdom", "france",
  "italy", "netherlands", "belgium", "southAfrica", "spain", "unitedStates", "other",
] as const;

// Interest options, sent as interest. The values match the HubSpot form's
// options; product names are never translated.
const interestKeys = [
  "invoiceBenchmarking", "claimsDecisioning", "damageReporting", "otus", "other",
] as const;

const interestValues: Record<(typeof interestKeys)[number], string> = {
  invoiceBenchmarking: "invoice_benchmarking",
  claimsDecisioning: "claims_decisioning",
  damageReporting: "damage_reporting",
  otus: "otus",
  other: "other",
};

// "How did you hear about us?" options, sent as heard_about and mapped to a
// HubSpot contact property. PROPOSED set until Firon's Schedule 2 list is
// confirmed: change the keys here and in messages/<locale>/contact.json.
const heardAboutKeys = [
  "aiAssistant", "searchEngine", "linkedin", "referral", "industryEvent", "other",
] as const;

const heardAboutValues: Record<(typeof heardAboutKeys)[number], string> = {
  aiAssistant: "ai_assistant",
  searchEngine: "search_engine",
  linkedin: "linkedin",
  referral: "referral",
  industryEvent: "industry_event",
  other: "other",
};

/** HubSpot's visitor cookie, readable only once analytics consent loaded its script. */
function hubspotUserToken(): string {
  if (!hasAnalyticsConsent()) return "";
  const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

function createContactSchema(t: (key: string) => string) {
  return z.object({
    firstName: z.string().min(1, t("form.validation.firstNameRequired")),
    lastName: z.string().min(1, t("form.validation.lastNameRequired")),
    email: z.string().email(t("form.validation.emailInvalid")),
    company: z.string().min(1, t("form.validation.companyRequired")),
    jobTitle: z.string().min(1, t("form.validation.jobTitleRequired")),
    country: z.string().min(1, t("form.validation.countryRequired")),
    interest: z.string().min(1, t("form.validation.interestRequired")),
    heard_about: z.string().min(1, t("form.validation.heardAboutRequired")),
    claimsVolume: z.string().optional(),
    message: z.string().optional(),
    consent: z.boolean().refine((val) => val === true, t("form.validation.consentRequired")),
  });
}

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const contactSchema = createContactSchema(t);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Spam checks for /api/contact: a field people never see or fill, and the
  // time since the form appeared. Bots fill every field and post at once.
  const honeypotRef = useRef<HTMLInputElement>(null);
  const shownAtRef = useRef(0);
  useEffect(() => {
    if (!isSubmitted) shownAtRef.current = Date.now();
  }, [isSubmitted]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          ...getFirstTouch(),
          page_locale: locale,
          page_uri: window.location.origin + window.location.pathname,
          page_name: document.title,
          hutk: hubspotUserToken(),
          website: honeypotRef.current?.value ?? "",
          elapsed_ms: Date.now() - shownAtRef.current,
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || t("form.errorGeneric"));
      }

      // Confirmed success only, never on click. No personal data.
      pushDataLayer({
        event: "form_submit_success",
        form_name: "demo_request",
        page_locale: locale,
        heard_about: data.heard_about,
      });
      setIsSubmitted(true);
      reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : t("form.errorGeneric")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-12">
      {/* Form */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {isSubmitted ? (
          <div className="rounded-pill bg-card shadow-card p-12 text-center">
            <StatusPill tone="approved" className="mb-6" />
            <h2 className="font-display text-2xl font-bold text-strong mb-4">
              {t("success.heading")}
            </h2>
            <p className="text-body mb-6">
              {t("success.message")}
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-link font-medium hover:underline"
            >
              {t("success.submitAnother")}
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-pill bg-card shadow-card p-8"
          >
            <h2 className="font-display text-2xl font-bold text-strong mb-6">
              {t("form.heading")}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label htmlFor="contact-firstName" className="block text-caption-sm text-subtle mb-2">
                  {t("form.firstName")} <span className="normal-case tracking-normal">{t("form.required")}</span>
                </label>
                <input
                  {...register("firstName")}
                  id="contact-firstName"
                  type="text"
                  className="w-full px-6 py-3"
                  placeholder={t("form.placeholders.firstName")}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-denied-dark flex items-center gap-1">
                    <AlertCircle strokeWidth={1.5} className="w-4 h-4" />
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="contact-lastName" className="block text-caption-sm text-subtle mb-2">
                  {t("form.lastName")} <span className="normal-case tracking-normal">{t("form.required")}</span>
                </label>
                <input
                  {...register("lastName")}
                  id="contact-lastName"
                  type="text"
                  className="w-full px-6 py-3"
                  placeholder={t("form.placeholders.lastName")}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-denied-dark flex items-center gap-1">
                    <AlertCircle strokeWidth={1.5} className="w-4 h-4" />
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="sm:col-span-2">
                <label htmlFor="contact-email" className="block text-caption-sm text-subtle mb-2">
                  {t("form.workEmail")} <span className="normal-case tracking-normal">{t("form.required")}</span>
                </label>
                <input
                  {...register("email")}
                  id="contact-email"
                  type="email"
                  className="w-full px-6 py-3"
                  placeholder={t("form.placeholders.email")}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-denied-dark flex items-center gap-1">
                    <AlertCircle strokeWidth={1.5} className="w-4 h-4" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Company */}
              <div>
                <label htmlFor="contact-company" className="block text-caption-sm text-subtle mb-2">
                  {t("form.company")} <span className="normal-case tracking-normal">{t("form.required")}</span>
                </label>
                <input
                  {...register("company")}
                  id="contact-company"
                  type="text"
                  className="w-full px-6 py-3"
                  placeholder={t("form.placeholders.company")}
                />
                {errors.company && (
                  <p className="mt-1 text-sm text-denied-dark flex items-center gap-1">
                    <AlertCircle strokeWidth={1.5} className="w-4 h-4" />
                    {errors.company.message}
                  </p>
                )}
              </div>

              {/* Job Title */}
              <div>
                <label htmlFor="contact-jobTitle" className="block text-caption-sm text-subtle mb-2">
                  {t("form.jobTitle")} <span className="normal-case tracking-normal">{t("form.required")}</span>
                </label>
                <input
                  {...register("jobTitle")}
                  id="contact-jobTitle"
                  type="text"
                  className="w-full px-6 py-3"
                  placeholder={t("form.placeholders.jobTitle")}
                />
                {errors.jobTitle && (
                  <p className="mt-1 text-sm text-denied-dark flex items-center gap-1">
                    <AlertCircle strokeWidth={1.5} className="w-4 h-4" />
                    {errors.jobTitle.message}
                  </p>
                )}
              </div>

              {/* Country */}
              <div>
                <label htmlFor="contact-country" className="block text-caption-sm text-subtle mb-2">
                  {t("form.country")} <span className="normal-case tracking-normal">{t("form.required")}</span>
                </label>
                <div className="relative">
                  <select
                    {...register("country")}
                    id="contact-country"
                    className="w-full px-6 py-3 pr-12 appearance-none"
                  >
                    <option value="">{t("form.selectCountry")}</option>
                    {countryKeys.map((key) => (
                      <option key={key} value={t(`form.countries.${key}`)}>
                        {t(`form.countries.${key}`)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown strokeWidth={1.5} className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-subtle pointer-events-none" />
                </div>
                {errors.country && (
                  <p className="mt-1 text-sm text-denied-dark flex items-center gap-1">
                    <AlertCircle strokeWidth={1.5} className="w-4 h-4" />
                    {errors.country.message}
                  </p>
                )}
              </div>

              {/* Interest */}
              <div>
                <label htmlFor="contact-interest" className="block text-caption-sm text-subtle mb-2">
                  {t("form.interest")} <span className="normal-case tracking-normal">{t("form.required")}</span>
                </label>
                <div className="relative">
                  <select
                    {...register("interest")}
                    id="contact-interest"
                    className="w-full px-6 py-3 pr-12 appearance-none"
                  >
                    <option value="">{t("form.selectInterest")}</option>
                    {interestKeys.map((key) => (
                      <option key={key} value={interestValues[key]}>
                        {t(`form.interests.${key}`)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown strokeWidth={1.5} className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-subtle pointer-events-none" />
                </div>
                {errors.interest && (
                  <p className="mt-1 text-sm text-denied-dark flex items-center gap-1">
                    <AlertCircle strokeWidth={1.5} className="w-4 h-4" />
                    {errors.interest.message}
                  </p>
                )}
              </div>

              {/* How did you hear about us? */}
              <div className="sm:col-span-2">
                <label htmlFor="contact-heard_about" className="block text-caption-sm text-subtle mb-2">
                  {t("form.leadSource")} <span className="normal-case tracking-normal">{t("form.required")}</span>
                </label>
                <div className="relative">
                  <select
                    {...register("heard_about")}
                    id="contact-heard_about"
                    className="w-full px-6 py-3 pr-12 appearance-none"
                  >
                    <option value="">{t("form.selectSource")}</option>
                    {heardAboutKeys.map((key) => (
                      <option key={key} value={heardAboutValues[key]}>
                        {t(`form.leadSources.${key}`)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown strokeWidth={1.5} className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-subtle pointer-events-none" />
                </div>
                {errors.heard_about && (
                  <p className="mt-1 text-sm text-denied-dark flex items-center gap-1">
                    <AlertCircle strokeWidth={1.5} className="w-4 h-4" />
                    {errors.heard_about.message}
                  </p>
                )}
              </div>

              {/* Claims Volume */}
              <div className="sm:col-span-2">
                <label htmlFor="contact-claimsVolume" className="block text-caption-sm text-subtle mb-2">
                  {t("form.claimsVolume")} <span className="text-subtle normal-case tracking-normal">{t("form.optional")}</span>
                </label>
                <input
                  {...register("claimsVolume")}
                  id="contact-claimsVolume"
                  type="text"
                  className="w-full px-6 py-3"
                  placeholder={t("form.placeholders.claimsVolume")}
                />
              </div>

              {/* Message */}
              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className="block text-caption-sm text-subtle mb-2">
                  {t("form.message")} <span className="text-subtle normal-case tracking-normal">{t("form.optional")}</span>
                </label>
                <textarea
                  {...register("message")}
                  id="contact-message"
                  rows={4}
                  className="w-full px-6 py-3 resize-none"
                  placeholder={t("form.placeholders.message")}
                />
              </div>

              {/* Honeypot: off screen, out of the tab order and hidden from
                  assistive technology, so only bots fill it. */}
              <div aria-hidden="true" className="absolute -left-[10000px] w-px h-px overflow-hidden">
                <input ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
              </div>

              {/* Consent */}
              <div className="sm:col-span-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    {...register("consent")}
                    type="checkbox"
                    className="mt-1 w-5 h-5 cursor-pointer"
                  />
                  <span className="text-sm text-body">
                    {t("form.consent")} <span className="text-subtle">{t("form.required")}</span>
                  </span>
                </label>
                {errors.consent && (
                  <p className="mt-1 text-sm text-denied-dark flex items-center gap-1">
                    <AlertCircle strokeWidth={1.5} className="w-4 h-4" />
                    {errors.consent.message}
                  </p>
                )}
              </div>

              {/* Error Message */}
              {submitError && (
                <div className="sm:col-span-2">
                  <div className="flex items-center gap-2 p-4 rounded-pill bg-denied-light text-denied-dark text-sm">
                    <AlertCircle strokeWidth={1.5} className="w-5 h-5 flex-shrink-0" />
                    {submitError}
                  </div>
                </div>
              )}

              {/* Submit */}
              <div className="sm:col-span-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className={cn("w-full", isSubmitting && "cursor-not-allowed")}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-on-brand/30 border-t-on-brand rounded-full animate-spin" />
                      {t("form.submitting")}
                    </>
                  ) : (
                    t("form.submit")
                  )}
                </Button>
                <p className="text-xs text-center text-muted mt-3">{t("form.responseTime")}</p>
              </div>
            </div>
          </form>
        )}
      </motion.div>

      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="space-y-8"
      >
        <div className="rounded-pill bg-card shadow-card p-8">
          <h3 className="font-display text-xl font-bold text-strong mb-6">
            {t("sidebar.heading")}
          </h3>
          <a
            href="mailto:info@trueaim.ai"
            className="flex items-center gap-4 p-4 rounded-pill bg-surface-muted transition-colors duration-150 ease-brand hover:bg-accent-soft"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-pill bg-lilac text-accent">
              <Mail strokeWidth={1.5} className="w-6 h-6" />
            </div>
            <div>
              <p className="font-medium text-strong">{t("sidebar.emailUs")}</p>
              <p className="text-body">{t("sidebar.emailAddress")}</p>
            </div>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
