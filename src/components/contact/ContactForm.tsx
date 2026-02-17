"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Calendar,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  MapPin,
} from "lucide-react";
import { SwitzerlandMap } from "@/components/ui/SwitzerlandMap";
import { cn } from "@/lib/utils";

type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle: string;
  country: string;
  interest: string;
  lead_source?: string;
  claimsVolume?: string;
  message?: string;
  consent: boolean;
};

const countryKeys = [
  "switzerland", "germany", "austria", "unitedKingdom", "france",
  "italy", "netherlands", "belgium", "southAfrica", "spain", "unitedStates", "other",
] as const;

const interestKeys = [
  "mira", "contextbuilder", "claimeval", "auditability", "earlyStage", "other",
] as const;

const interestValues: Record<string, string> = {
  mira: "mira",
  contextbuilder: "contextbuilder",
  claimeval: "claimeval",
  auditability: "auditability",
  earlyStage: "early-stage",
  other: "other",
};

const leadSourceKeys = [
  "referral", "industryEvent", "onlineResearch", "linkedin", "other",
] as const;

const leadSourceValues: Record<string, string> = {
  referral: "referral",
  industryEvent: "industry-event",
  onlineResearch: "online-research",
  linkedin: "linkedin",
  other: "other",
};

function createContactSchema(t: (key: string) => string) {
  return z.object({
    firstName: z.string().min(1, t("form.validation.firstNameRequired")),
    lastName: z.string().min(1, t("form.validation.lastNameRequired")),
    email: z.string().email(t("form.validation.emailInvalid")),
    company: z.string().min(1, t("form.validation.companyRequired")),
    jobTitle: z.string().min(1, t("form.validation.jobTitleRequired")),
    country: z.string().min(1, t("form.validation.countryRequired")),
    interest: z.string().min(1, t("form.validation.interestRequired")),
    lead_source: z.string().optional(),
    claimsVolume: z.string().optional(),
    message: z.string().optional(),
    consent: z.boolean().refine((val) => val === true, t("form.validation.consentRequired")),
  });
}

export function ContactForm() {
  const t = useTranslations("contact");
  const contactSchema = createContactSchema(t);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || t("form.errorGeneric"));
      }

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Form */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {isSubmitted ? (
          <div className="glass-panel p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              {t("success.heading")}
            </h2>
            <p className="text-[var(--text-secondary)] mb-6">
              {t("success.message")}
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-[var(--primary)] font-medium hover:underline"
            >
              {t("success.submitAnother")}
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="glass-panel p-8"
          >
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
              {t("form.heading")}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  {t("form.firstName")} <span className="text-red-400">{t("form.required")}</span>
                </label>
                <input
                  {...register("firstName")}
                  type="text"
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border bg-[var(--card-bg)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors",
                    errors.firstName
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-[var(--border)] focus:border-[var(--primary)] focus:ring-[var(--primary)]"
                  )}
                  placeholder={t("form.placeholders.firstName")}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  {t("form.lastName")} <span className="text-red-400">{t("form.required")}</span>
                </label>
                <input
                  {...register("lastName")}
                  type="text"
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border bg-[var(--card-bg)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors",
                    errors.lastName
                      ? "border-red-500 focus:border-red-500"
                      : "border-[var(--border)] focus:border-[var(--primary)]"
                  )}
                  placeholder={t("form.placeholders.lastName")}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  {t("form.workEmail")} <span className="text-red-400">{t("form.required")}</span>
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border bg-[var(--card-bg)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors",
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-[var(--border)] focus:border-[var(--primary)]"
                  )}
                  placeholder={t("form.placeholders.email")}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  {t("form.company")} <span className="text-red-400">{t("form.required")}</span>
                </label>
                <input
                  {...register("company")}
                  type="text"
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border bg-[var(--card-bg)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors",
                    errors.company
                      ? "border-red-500 focus:border-red-500"
                      : "border-[var(--border)] focus:border-[var(--primary)]"
                  )}
                  placeholder={t("form.placeholders.company")}
                />
                {errors.company && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.company.message}
                  </p>
                )}
              </div>

              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  {t("form.jobTitle")} <span className="text-red-400">{t("form.required")}</span>
                </label>
                <input
                  {...register("jobTitle")}
                  type="text"
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border bg-[var(--card-bg)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors",
                    errors.jobTitle
                      ? "border-red-500 focus:border-red-500"
                      : "border-[var(--border)] focus:border-[var(--primary)]"
                  )}
                  placeholder={t("form.placeholders.jobTitle")}
                />
                {errors.jobTitle && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.jobTitle.message}
                  </p>
                )}
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  {t("form.country")} <span className="text-red-400">{t("form.required")}</span>
                </label>
                <div className="relative">
                  <select
                    {...register("country")}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border bg-[var(--card-bg)] text-[var(--text-primary)] transition-colors appearance-none",
                      errors.country
                        ? "border-red-500 focus:border-red-500"
                        : "border-[var(--border)] focus:border-[var(--primary)]"
                    )}
                  >
                    <option value="" className="bg-[var(--background)]">{t("form.selectCountry")}</option>
                    {countryKeys.map((key) => (
                      <option key={key} value={t(`form.countries.${key}`)} className="bg-[var(--background)]">
                        {t(`form.countries.${key}`)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)] pointer-events-none" />
                </div>
                {errors.country && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.country.message}
                  </p>
                )}
              </div>

              {/* Interest */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  {t("form.interest")} <span className="text-red-400">{t("form.required")}</span>
                </label>
                <div className="relative">
                  <select
                    {...register("interest")}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border bg-[var(--card-bg)] text-[var(--text-primary)] transition-colors appearance-none",
                      errors.interest
                        ? "border-red-500 focus:border-red-500"
                        : "border-[var(--border)] focus:border-[var(--primary)]"
                    )}
                  >
                    <option value="" className="bg-[var(--background)]">{t("form.selectInterest")}</option>
                    {interestKeys.map((key) => (
                      <option key={key} value={interestValues[key]} className="bg-[var(--background)]">
                        {t(`form.interests.${key}`)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)] pointer-events-none" />
                </div>
                {errors.interest && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.interest.message}
                  </p>
                )}
              </div>

              {/* Lead Source */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  {t("form.leadSource")} <span className="text-[var(--text-muted)]">{t("form.optional")}</span>
                </label>
                <div className="relative">
                  <select
                    {...register("lead_source")}
                    className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-primary)] transition-colors appearance-none focus:border-[var(--primary)]"
                  >
                    <option value="" className="bg-[var(--background)]">{t("form.selectSource")}</option>
                    {leadSourceKeys.map((key) => (
                      <option key={key} value={leadSourceValues[key]} className="bg-[var(--background)]">
                        {t(`form.leadSources.${key}`)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)] pointer-events-none" />
                </div>
              </div>

              {/* Claims Volume */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  {t("form.claimsVolume")} <span className="text-[var(--text-muted)]">{t("form.optional")}</span>
                </label>
                <input
                  {...register("claimsVolume")}
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] transition-colors"
                  placeholder={t("form.placeholders.claimsVolume")}
                />
              </div>

              {/* Message */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  {t("form.message")} <span className="text-[var(--text-muted)]">{t("form.optional")}</span>
                </label>
                <textarea
                  {...register("message")}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] transition-colors resize-none"
                  placeholder={t("form.placeholders.message")}
                />
              </div>

              {/* Consent */}
              <div className="sm:col-span-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    {...register("consent")}
                    type="checkbox"
                    className="mt-1 w-5 h-5 rounded border-[var(--border)] bg-white/5 text-[var(--primary)] focus:ring-[var(--primary)]"
                  />
                  <span className="text-sm text-[var(--text-secondary)]">
                    {t("form.consent")} <span className="text-red-400">{t("form.required")}</span>
                  </span>
                </label>
                {errors.consent && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.consent.message}
                  </p>
                )}
              </div>

              {/* Error Message */}
              {submitError && (
                <div className="sm:col-span-2">
                  <div className="flex items-center gap-2 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {submitError}
                  </div>
                </div>
              )}

              {/* Submit */}
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-[var(--primary)]/30"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t("form.submitting")}
                    </>
                  ) : (
                    t("form.submit")
                  )}
                </button>
                <p className="text-xs text-center text-[var(--text-muted)] mt-3">{t("form.responseTime")}</p>
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
        {/* Alternative Contact */}
        <div className="glass-panel p-8">
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">
            {t("sidebar.alternativeContact")}
          </h3>
          <div className="space-y-4">
            <a
              href="mailto:info@trueaim.ai"
              className="flex items-center gap-4 p-4 rounded-xl glass-panel-light hover:bg-[var(--subtle-bg-hover)] transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
                <Mail className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <div>
                <p className="font-medium text-[var(--text-primary)]">{t("sidebar.emailUs")}</p>
                <p className="text-[var(--text-secondary)]">{t("sidebar.emailAddress")}</p>
              </div>
            </a>
            <a
              href="https://calendar.app.google/MEVp3kcksVTVw3nf6"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl glass-panel-light hover:bg-[var(--subtle-bg-hover)] transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--aurora-cyan)]/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[var(--aurora-cyan)]" />
              </div>
              <div>
                <p className="font-medium text-[var(--text-primary)]">{t("sidebar.bookCall")}</p>
              </div>
            </a>
          </div>
        </div>

        {/* Headquarters */}
        <div className="glass-panel p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/20 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[var(--primary)]" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)]">
              {t("sidebar.headquarters")}
            </h3>
          </div>
          <address className="not-italic text-[var(--text-secondary)] leading-relaxed space-y-1 mb-6">
            <p>{t("sidebar.address.street")}</p>
            <p>{t("sidebar.address.city")}</p>
            <p>{t("sidebar.address.country")}</p>
          </address>
          <div className="aspect-square">
            <SwitzerlandMap label={t("sidebar.mapLabel")} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
