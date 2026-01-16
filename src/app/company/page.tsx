"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Quote,
  Users,
  Briefcase,
  GraduationCap,
  Building2,
  Linkedin
} from "lucide-react";

const founders = [
  {
    name: "Reuben John",
    role: "Co-Founder & CEO",
    tagline: "2x Founder | Attorney | Former MD Largest Global Withholding Tax Claim Provider",
    bio: "Reuben has led high-stakes operational and regulatory projects across Europe and Africa. He secured CHF 300,000 from Innosuisse for TrueAim.ai's advanced R&D.",
    linkedin: "#",
  },
  {
    name: "Frederic Brunner",
    role: "Co-Founder & CTO",
    tagline: "Ex-Zurich Insurance | Ex-Guidewire | 20+ Years Enterprise Automation",
    bio: "Frederic combines deep architectural expertise with practical delivery experience. He previously led technology transformation at Guidewire and has implemented multiple AI and automation projects.",
    linkedin: "#",
  },
];

const advisors = [
  {
    name: "Claudio Gienal",
    title: "AXA Group Chief Transformation Officer | Former AXA CEO UK & Ireland",
  },
  {
    name: "Eric Zielinski",
    title: "Wharton | Ex-Bain | Tech Founder",
  },
  {
    name: "Dr. Lukas Lichtensteiger",
    title: "Harvard | Serial Entrepreneur & CTO",
  },
  {
    name: "Dave Stoll",
    title: "Ex-Zurich Insurance CFO (Spain) | Founder of doppo",
  },
  {
    name: "Dr. Dandolo Flumini",
    title: "Original developer | PhD Math & CS | ZHAW Researcher",
  },
  {
    name: "Bassil Eid",
    title: "Serial Founder & CFO | Fintech Innovator",
  },
];

const partners = [
  {
    name: "Yarowa AG",
    description: "Lead investor (30% shareholder). Swiss InsurTech powerhouse trusted by 100+ insurers. Enterprise-grade SaaS blueprint and client network.",
    icon: Building2,
  },
  {
    name: "ZHAW",
    description: "Zurich University of Applied Sciences. Research partnership on logic extraction. Home of TrueAim.ai technology's original development.",
    icon: GraduationCap,
  },
  {
    name: "Innosuisse",
    description: "Switzerland's official innovation agency. CHF 300,000 non-dilutive grant. National-level validation.",
    icon: Briefcase,
  },
];

export default function CompanyPage() {
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              About Us
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              Swiss Precision.
              <br />
              <span className="text-[var(--primary)]">Auditable AI.</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
              TrueAim.ai pioneers neuro-symbolic AI for regulated industries. We&apos;re building the logic layer that powers compliant, explainable decisions at scale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-8 md:p-12"
          >
            <div className="w-12 h-12 rounded-full bg-[var(--primary)]/20 flex items-center justify-center mb-6">
              <Quote className="w-6 h-6 text-[var(--primary)]" />
            </div>
            <blockquote className="text-xl md:text-2xl text-[var(--text-primary)] leading-relaxed italic">
              &ldquo;Combine the power of Agentic AI with the reliability of deterministic outcomes to become the global logic layer that powers claim determinations in a legally compliant and automated way.&rdquo;
            </blockquote>
            <p className="mt-6 text-[var(--text-muted)] font-medium">Our Mission</p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              Leadership Team
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Deep expertise in insurance, technology, and regulation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel glass-panel-hover p-8"
              >
                {/* Avatar placeholder */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--aurora-cyan)] flex items-center justify-center mb-6">
                  <span className="text-3xl font-bold text-white">
                    {founder.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
                  {founder.name}
                </h3>
                <p className="text-[var(--primary)] font-medium mb-3">
                  {founder.role}
                </p>
                <p className="text-sm text-[var(--text-muted)] mb-4">
                  {founder.tagline}
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  {founder.bio}
                </p>
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--aurora-cyan)] hover:text-[var(--primary)] transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  Connect on LinkedIn
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              Advisors
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Guided by industry leaders
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advisors.map((advisor, index) => (
              <motion.div
                key={advisor.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="glass-panel glass-panel-hover p-6"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--aurora-purple)]/30 to-[var(--aurora-cyan)]/30 flex items-center justify-center mb-4">
                  <span className="text-lg font-bold text-white">
                    {advisor.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                  {advisor.name}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  {advisor.title}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              Partners & Backers
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Supported by Switzerland&apos;s innovation ecosystem
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel glass-panel-hover p-8"
              >
                <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6">
                  <partner.icon className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                  {partner.name}
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {partner.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              Join Us in Transforming Claims
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-10">
              Whether you&apos;re an insurer looking to automate claims or a professional interested in joining our team, we&apos;d love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors text-lg shadow-lg shadow-[var(--primary)]/30"
              >
                Get in Touch
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
