"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import {
  Mail,
  Calendar,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(1, "Company is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  country: z.string().min(1, "Please select a country"),
  interest: z.string().min(1, "Please select your interest"),
  claimsVolume: z.string().optional(),
  message: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, "You must agree to receive communications"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const countries = [
  "Switzerland",
  "Germany",
  "Austria",
  "United Kingdom",
  "France",
  "Italy",
  "Netherlands",
  "Belgium",
  "Spain",
  "United States",
  "Other",
];

const interests = [
  { value: "mira", label: "MIRA - Decisioning Engine" },
  { value: "contextbuilder", label: "ContextBuilder - Document Pipeline" },
  { value: "claimeval", label: "ClaimEval - Quality Assurance" },
  { value: "general", label: "General Inquiry" },
  { value: "partnership", label: "Partnership Opportunity" },
];


export default function ContactPage() {
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
        throw new Error(result?.error || "Something went wrong. Please try again.");
      }

      setIsSubmitted(true);
      reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] text-sm font-medium mb-6">
              <MessageSquare className="w-4 h-4" />
              Contact Us
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              Let&apos;s Talk
              <br />
              <span className="text-[var(--primary)]">Claims Automation</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              Whether you&apos;re exploring options or ready for a pilot, we&apos;d love to show you what auditable AI can do.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
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
                    Thank You!
                  </h2>
                  <p className="text-[var(--text-secondary)] mb-6">
                    We&apos;ve received your request. We typically respond within 1 business day.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-[var(--primary)] font-medium hover:underline"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="glass-panel p-8"
                >
                  <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                    Book a Demo
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                        First Name <span className="text-red-400">*</span>
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
                        placeholder="John"
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
                        Last Name <span className="text-red-400">*</span>
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
                        placeholder="Doe"
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
                        Work Email <span className="text-red-400">*</span>
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
                        placeholder="john.doe@company.com"
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
                        Company <span className="text-red-400">*</span>
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
                        placeholder="Company Name"
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
                        Job Title <span className="text-red-400">*</span>
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
                        placeholder="Claims Manager"
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
                        Country <span className="text-red-400">*</span>
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
                          <option value="" className="bg-[var(--background)]">Select country</option>
                          {countries.map((country) => (
                            <option key={country} value={country} className="bg-[var(--background)]">
                              {country}
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
                        What interests you? <span className="text-red-400">*</span>
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
                          <option value="" className="bg-[var(--background)]">Select interest</option>
                          {interests.map((interest) => (
                            <option key={interest.value} value={interest.value} className="bg-[var(--background)]">
                              {interest.label}
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

                    {/* Claims Volume */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                        Annual claims volume <span className="text-[var(--text-muted)]">(Optional)</span>
                      </label>
                      <input
                        {...register("claimsVolume")}
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] transition-colors"
                        placeholder="e.g., 50,000 claims/year"
                      />
                    </div>

                    {/* Message */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                        Tell us about your needs <span className="text-[var(--text-muted)]">(Optional)</span>
                      </label>
                      <textarea
                        {...register("message")}
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] transition-colors resize-none"
                        placeholder="What challenges are you facing with claims processing?"
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
                          I agree to receive communications from TrueAim.ai <span className="text-red-400">*</span>
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
                            Submitting...
                          </>
                        ) : (
                          "Book a Demo"
                        )}
                      </button>
                      <p className="text-xs text-center text-[var(--text-muted)] mt-3">We typically respond within 1 business day.</p>
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
                  Alternative Contact
                </h3>
                <div className="space-y-4">
                  <a
                    href="mailto:hello@trueaim.ai"
                    className="flex items-center gap-4 p-4 rounded-xl glass-panel-light hover:bg-[var(--subtle-bg-hover)] transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-[var(--primary)]" />
                    </div>
                    <div>
                      <p className="font-medium text-[var(--text-primary)]">Email us</p>
                      <p className="text-[var(--text-secondary)]">hello@trueaim.ai</p>
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
                      <p className="font-medium text-[var(--text-primary)]">Book a 30-minute call</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Security Review */}
              <div className="glass-panel p-8">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">
                  Security Assessment
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  Need a security assessment? Request our Trust Pack for details on our security architecture, compliance posture, and data protection controls.
                </p>
                <Link
                  href="/trust#trust-pack"
                  className="inline-flex items-center gap-2 text-sm text-[var(--primary)] font-medium hover:underline"
                >
                  <Shield className="w-4 h-4" />
                  Request Trust Pack
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
