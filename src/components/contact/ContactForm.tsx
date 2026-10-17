"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, Check, ChevronDown, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/brand/Button";
import { CARD } from "@/components/content/surface";
import { Link } from "@/i18n/navigation";
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

// Interest options, sent as interest, in the site's product order. The values
// match the HubSpot form's options; product names are never translated.
const interestKeys = [
  "claimsDecisioning", "invoiceBenchmarking", "damageReporting", "otus", "other",
] as const;

const interestValues: Record<(typeof interestKeys)[number], string> = {
  claimsDecisioning: "claims_decisioning",
  invoiceBenchmarking: "invoice_benchmarking",
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

// Form controls as the prototype draws them: 8px corners on a neutral field.
const LABEL = "mb-2 block text-sm font-medium text-strong";
const FIELD = "w-full rounded-[8px] border border-line-strong bg-ta-neutral-0 px-3.5 py-3 text-base text-body";
const SELECT = cn(FIELD, "appearance-none pr-12");
const CHEVRON = "pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-subtle";
const CHANNEL_ICON = "grid h-12 w-12 shrink-0 place-items-center rounded-full bg-card text-accent shadow-swatch";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1 text-sm text-denied-dark">
      <AlertCircle strokeWidth={1.5} className="h-4 w-4" />
      {message}
    </p>
  );
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
    <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-20">
      {/* The other ways in: email, LinkedIn and the office. */}
      <ul className="space-y-7">
        <li className="flex items-start gap-4">
          <span className={CHANNEL_ICON}>
            <Mail strokeWidth={1.5} className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-medium text-strong">{t("aside.emailLabel")}</p>
            <a href={`mailto:${t("aside.emailAddress")}`} className="mt-0.5 block text-[18px] font-medium text-accent hover:underline">
              {t("aside.emailAddress")}
            </a>
          </div>
        </li>
        <li className="flex items-start gap-4">
          <span className={CHANNEL_ICON}>
            <Linkedin strokeWidth={1.5} className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-medium text-strong">{t("aside.linkedinLabel")}</p>
            <a
              href="https://www.linkedin.com/company/true-aim-ag"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-0.5 block text-[18px] font-medium text-accent hover:underline"
            >
              {t("aside.linkedinText")}
            </a>
          </div>
        </li>
        <li className="flex items-start gap-4">
          <span className={CHANNEL_ICON}>
            <MapPin strokeWidth={1.5} className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-medium text-strong">{t("aside.officeLabel")}</p>
            <address className="mt-0.5 max-w-[32ch] not-italic text-[18px] leading-[1.5] text-body">{t("aside.address")}</address>
          </div>
        </li>
      </ul>

      <div>
        {isSubmitted ? (
          <div className={cn(CARD, "p-10")}>
            <h2 className="font-display text-[22px] font-semibold leading-[1.3] text-strong">{t("success.heading")}</h2>
            <p className="mt-3 text-body">{t("success.message")}</p>
            <button type="button" onClick={() => setIsSubmitted(false)} className="mt-6 text-sm font-medium text-accent hover:underline">
              {t("success.submitAnother")}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className={cn(CARD, "p-8 md:p-10")}>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-firstName" className={LABEL}>
                  {t("form.firstName")} <span aria-hidden="true">{t("form.required")}</span>
                </label>
                <input {...register("firstName")} id="contact-firstName" type="text" className={FIELD} placeholder={t("form.placeholders.firstName")} />
                <FieldError message={errors.firstName?.message} />
              </div>

              <div>
                <label htmlFor="contact-lastName" className={LABEL}>
                  {t("form.lastName")} <span aria-hidden="true">{t("form.required")}</span>
                </label>
                <input {...register("lastName")} id="contact-lastName" type="text" className={FIELD} placeholder={t("form.placeholders.lastName")} />
                <FieldError message={errors.lastName?.message} />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="contact-email" className={LABEL}>
                  {t("form.workEmail")} <span aria-hidden="true">{t("form.required")}</span>
                </label>
                <input {...register("email")} id="contact-email" type="email" className={FIELD} placeholder={t("form.placeholders.email")} />
                <FieldError message={errors.email?.message} />
              </div>

              <div>
                <label htmlFor="contact-company" className={LABEL}>
                  {t("form.company")} <span aria-hidden="true">{t("form.required")}</span>
                </label>
                <input {...register("company")} id="contact-company" type="text" className={FIELD} placeholder={t("form.placeholders.company")} />
                <FieldError message={errors.company?.message} />
              </div>

              <div>
                <label htmlFor="contact-jobTitle" className={LABEL}>
                  {t("form.jobTitle")} <span aria-hidden="true">{t("form.required")}</span>
                </label>
                <input {...register("jobTitle")} id="contact-jobTitle" type="text" className={FIELD} placeholder={t("form.placeholders.jobTitle")} />
                <FieldError message={errors.jobTitle?.message} />
              </div>

              <div>
                <label htmlFor="contact-country" className={LABEL}>
                  {t("form.country")} <span aria-hidden="true">{t("form.required")}</span>
                </label>
                <div className="relative">
                  <select {...register("country")} id="contact-country" className={SELECT}>
                    <option value="">{t("form.selectCountry")}</option>
                    {countryKeys.map((key) => (
                      <option key={key} value={t(`form.countries.${key}`)}>
                        {t(`form.countries.${key}`)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown strokeWidth={1.5} className={CHEVRON} />
                </div>
                <FieldError message={errors.country?.message} />
              </div>

              <div>
                <label htmlFor="contact-interest" className={LABEL}>
                  {t("form.interest")} <span aria-hidden="true">{t("form.required")}</span>
                </label>
                <div className="relative">
                  <select {...register("interest")} id="contact-interest" className={SELECT}>
                    <option value="">{t("form.selectInterest")}</option>
                    {interestKeys.map((key) => (
                      <option key={key} value={interestValues[key]}>
                        {t(`form.interests.${key}`)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown strokeWidth={1.5} className={CHEVRON} />
                </div>
                <FieldError message={errors.interest?.message} />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="contact-heard_about" className={LABEL}>
                  {t("form.leadSource")} <span aria-hidden="true">{t("form.required")}</span>
                </label>
                <div className="relative">
                  <select {...register("heard_about")} id="contact-heard_about" className={SELECT}>
                    <option value="">{t("form.selectSource")}</option>
                    {heardAboutKeys.map((key) => (
                      <option key={key} value={heardAboutValues[key]}>
                        {t(`form.leadSources.${key}`)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown strokeWidth={1.5} className={CHEVRON} />
                </div>
                <FieldError message={errors.heard_about?.message} />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="contact-claimsVolume" className={LABEL}>
                  {t("form.claimsVolume")} <span className="font-normal text-subtle">{t("form.optional")}</span>
                </label>
                <input {...register("claimsVolume")} id="contact-claimsVolume" type="text" className={FIELD} placeholder={t("form.placeholders.claimsVolume")} />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className={LABEL}>
                  {t("form.message")} <span className="font-normal text-subtle">{t("form.optional")}</span>
                </label>
                <textarea {...register("message")} id="contact-message" rows={5} className={cn(FIELD, "resize-none")} placeholder={t("form.placeholders.message")} />
              </div>

              {/* Honeypot: off screen, out of the tab order and hidden from
                  assistive technology, so only bots fill it. */}
              <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
                <input ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
              </div>

              <div className="sm:col-span-2">
                {/* A white box with a hairline, filled blue when ticked. */}
                <label className="flex cursor-pointer items-start gap-3">
                  <input {...register("consent")} type="checkbox" className="peer sr-only" />
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[4px] border border-line-strong bg-ta-neutral-0 text-transparent transition-colors duration-150 ease-brand peer-checked:border-accent peer-checked:bg-accent peer-checked:text-on-brand peer-focus-visible:ring-[3px] peer-focus-visible:ring-focus"
                  >
                    <Check strokeWidth={2.5} className="h-3 w-3" />
                  </span>
                  <span className="text-sm leading-[1.5] text-body">
                    {t.rich("form.consent", {
                      privacy: (chunks) => (
                        <Link href="/privacy" className="text-accent underline">
                          {chunks}
                        </Link>
                      ),
                    })}{" "}
                    <span aria-hidden="true">{t("form.required")}</span>
                  </span>
                </label>
                <FieldError message={errors.consent?.message} />
              </div>

              {submitError && (
                <div className="sm:col-span-2">
                  <div className="flex items-center gap-2 rounded-[8px] bg-denied-light p-4 text-sm text-denied-dark">
                    <AlertCircle strokeWidth={1.5} className="h-5 w-5 flex-shrink-0" />
                    {submitError}
                  </div>
                </div>
              )}

              <div className="sm:col-span-2">
                <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className={cn(isSubmitting && "cursor-not-allowed")}>
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-on-brand/30 border-t-on-brand" />
                      {t("form.submitting")}
                    </>
                  ) : (
                    t("form.submit")
                  )}
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
