"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Key,
  FileCheck,
  Server,
  Globe,
  CheckCircle,
  Download,
  MapPin,
  Eye,
  History,
  ArrowRight,
  AlertCircle,
  Building2,
} from "lucide-react";

const complianceBadges = [
  {
    name: "GDPR",
    status: "aligned",
    description: "Architecture aligned with EU data protection regulation",
    icon: Shield,
  },
  {
    name: "EU AI Act",
    status: "aligned",
    description: "Built for high-risk AI system requirements",
    icon: Eye,
  },
  {
    name: "Swiss Hosting",
    status: "available",
    description: "Data residency within Swiss borders",
    icon: MapPin,
  },
  {
    name: "ISO 27001",
    status: "roadmap",
    description: "Current controls align to the framework. Formal certification scheduled for 2026.",
    icon: FileCheck,
  },
  {
    name: "SOC 2 Type II",
    status: "roadmap",
    description: "Current controls align to the framework. Formal certification scheduled for 2026.",
    icon: Lock,
  },
  {
    name: "FINMA Guidelines",
    status: "aligned",
    description: "Swiss financial regulator compliance",
    icon: Building2,
  },
  {
    name: "DORA",
    status: "aligned",
    description: "Digital Operational Resilience Act alignment for financial entities",
    icon: Shield,
  },
];

const securityFeatures = [
  {
    category: "Data Protection",
    icon: Lock,
    features: [
      { name: "Encryption at Rest", detail: "AES-256 encryption for all stored data" },
      { name: "Encryption in Transit", detail: "TLS 1.3 for all data transmission" },
      { name: "Data Isolation", detail: "Tenant-specific data segregation" },
      { name: "Secure Key Management", detail: "Hardware security module (HSM) backed" },
    ],
  },
  {
    category: "Access Control",
    icon: Key,
    features: [
      { name: "Role-Based Access (RBAC)", detail: "Granular permission management" },
      { name: "SSO Integration", detail: "SAML 2.0 and OIDC support" },
      { name: "Multi-Factor Authentication", detail: "MFA enforcement available" },
      { name: "Session Management", detail: "Configurable timeout and controls" },
    ],
  },
  {
    category: "Audit & Monitoring",
    icon: History,
    features: [
      { name: "Complete Audit Logs", detail: "Every action logged with timestamps" },
      { name: "Decision Replay", detail: "Re-run any decision with identical results" },
      { name: "Access Logging", detail: "Full visibility into data access" },
      { name: "Retention Policies", detail: "Configurable log retention periods" },
    ],
  },
];

const euAiActFeatures = [
  {
    requirement: "Human Oversight",
    description: "Configurable approval gates and exception routing ensure human review where required",
    implemented: true,
  },
  {
    requirement: "Transparency",
    description: "Every decision traceable to specific policy clauses and source documents",
    implemented: true,
  },
  {
    requirement: "Technical Documentation",
    description: "Comprehensive system documentation available for regulatory review",
    implemented: true,
  },
  {
    requirement: "Risk Management",
    description: "Built-in confidence scoring and exception handling for edge cases",
    implemented: true,
  },
  {
    requirement: "Data Governance",
    description: "Clear data lineage and quality controls throughout the pipeline",
    implemented: true,
  },
  {
    requirement: "Accuracy & Robustness",
    description: "Deterministic logic ensures consistent outputs for identical inputs",
    implemented: true,
  },
];

const trustResources = [
  {
    title: "Security Whitepaper",
    description: "Detailed overview of our security architecture and controls",
    icon: FileCheck,
    available: true,
  },
  {
    title: "Data Processing Agreement",
    description: "Template DPA for enterprise procurement",
    icon: FileCheck,
    available: true,
  },
  {
    title: "Compliance Questionnaire",
    description: "Pre-filled responses to common security questions",
    icon: FileCheck,
    available: true,
  },
  {
    title: "Penetration Test Report",
    description: "Third-party security assessment results",
    icon: Shield,
    available: false,
  },
];

export default function TrustPage() {
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
              <Shield className="w-4 h-4" />
              Trust Center
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              Enterprise Security.
              <br />
              <span className="text-[var(--primary)]">Regulatory Compliance.</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed mb-8">
              Built from the ground up for regulated industries. Swiss precision meets enterprise-grade security. Your data protected, your compliance assured.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors shadow-lg shadow-[var(--primary)]/30"
              >
                Request Security Review
              </Link>
              <a
                href="#trust-pack"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-medium hover:bg-[var(--primary-light)] transition-colors"
              >
                <Download className="w-4 h-4" />
                Request Trust Pack
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Compliance Badges Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              Compliance & Certifications
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Meeting the standards that matter for regulated industries
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceBadges.map((badge, index) => (
              <motion.div
                key={badge.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel glass-panel-hover p-6"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    badge.status === 'compliant' || badge.status === 'ready' || badge.status === 'available' || badge.status === 'aligned'
                      ? 'bg-emerald-500/20'
                      : 'bg-amber-500/20'
                  }`}>
                    <badge.icon className={`w-6 h-6 ${
                      badge.status === 'compliant' || badge.status === 'ready' || badge.status === 'available' || badge.status === 'aligned'
                        ? 'text-emerald-400'
                        : 'text-amber-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-[var(--text-primary)]">{badge.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        badge.status === 'compliant' ? 'bg-emerald-500/20 text-emerald-400' :
                        badge.status === 'ready' ? 'bg-blue-500/20 text-blue-400' :
                        badge.status === 'available' ? 'bg-emerald-500/20 text-emerald-400' :
                        badge.status === 'aligned' ? 'bg-emerald-500/20 text-emerald-400' :
                        'bg-amber-500/20 text-amber-400'
                      }`}>
                        {badge.status === 'roadmap' ? '2026' : badge.status}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-muted)]">{badge.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Residency Map */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
                Data Residency & Sovereignty
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-6 leading-relaxed">
                Your data stays where you need it. Choose Swiss-based hosting for maximum data sovereignty, or EU processing zones for GDPR compliance. Data processing boundaries are defined in your DPA &mdash; <Link href="/contact" className="text-[var(--primary)] hover:underline">request one here</Link>.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[var(--text-primary)]">Swiss Data Center Option</strong>
                    <p className="text-sm text-[var(--text-muted)]">Host your data within Swiss borders, protected by Swiss privacy laws</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[var(--text-primary)]">EU Processing Zones</strong>
                    <p className="text-sm text-[var(--text-muted)]">Data never leaves the European Union</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[var(--text-primary)]">No Third-Country Transfers</strong>
                    <p className="text-sm text-[var(--text-muted)]">Complete control over where your data is processed</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Stylized Europe map representation */}
              <div className="glass-panel p-8 aspect-square relative overflow-hidden">
                <div className="absolute inset-4 border-2 border-dashed border-[var(--border)] rounded-xl" />

                {/* Switzerland marker */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-red-400" />
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <span className="text-sm font-semibold text-[var(--text-primary)] bg-[var(--subtle-bg)] px-2 py-1 rounded backdrop-blur-sm">
                        Switzerland
                      </span>
                    </div>
                  </div>
                </div>

                {/* EU zone indicator */}
                <div className="absolute inset-8 border-2 border-blue-400/30 rounded-xl bg-blue-500/5" />
                <div className="absolute top-4 right-4 flex items-center gap-2 glass-panel-light px-3 py-1.5 rounded-lg">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-medium text-blue-400">EU Zone</span>
                </div>

                {/* Server icons */}
                <Server className="absolute bottom-8 left-8 w-6 h-6 text-[var(--text-muted)]" />
                <Server className="absolute bottom-8 right-8 w-6 h-6 text-[var(--text-muted)]" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              Security Architecture
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Enterprise-grade security controls at every layer
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {securityFeatures.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel p-8"
              >
                <div className="w-14 h-14 rounded-xl bg-[var(--primary)]/20 flex items-center justify-center mb-6">
                  <category.icon className="w-7 h-7 text-[var(--primary)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
                  {category.category}
                </h3>
                <ul className="space-y-4">
                  {category.features.map((feature) => (
                    <li key={feature.name} className="border-b border-[var(--border)] pb-4 last:border-0 last:pb-0">
                      <div className="font-medium text-[var(--text-primary)] mb-1">{feature.name}</div>
                      <div className="text-sm text-[var(--text-muted)]">{feature.detail}</div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EU AI Act Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium mb-4">
              <Eye className="w-4 h-4" />
              Regulatory Compliance
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              EU AI Act Alignment
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
              Our neuro-symbolic architecture is purpose-built to meet the transparency, oversight, and documentation requirements of the EU AI Act for high-risk AI systems.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {euAiActFeatures.map((feature, index) => (
              <motion.div
                key={feature.requirement}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass-panel glass-panel-hover p-6"
              >
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-[var(--text-primary)]">{feature.requirement}</h3>
                </div>
                <p className="text-sm text-[var(--text-muted)] ml-8">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Deterministic advantage callout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 glass-panel p-8 text-center"
          >
            <AlertCircle className="w-10 h-10 text-[var(--primary)] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Why Deterministic AI Matters for Compliance
            </h3>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Unlike probabilistic AI systems, our deterministic logic engine produces <strong className="text-[var(--text-primary)]">identical outputs for identical inputs</strong>, making it straightforward to demonstrate consistency, fairness, and transparency to regulators.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust Pack Download */}
      <section id="trust-pack" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              Request Trust Pack
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Everything your security and procurement teams need
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trustResources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`glass-panel p-6 ${
                  resource.available ? 'glass-panel-hover cursor-pointer' : 'opacity-60'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    resource.available ? 'bg-[var(--primary)]/20' : 'bg-white/5'
                  }`}>
                    <resource.icon className={`w-6 h-6 ${
                      resource.available ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-[var(--text-primary)]">{resource.title}</h3>
                      {!resource.available && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--subtle-bg)] text-[var(--text-muted)]">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--text-muted)] mb-3">{resource.description}</p>
                    {resource.available && (
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1 text-sm text-[var(--primary)] font-medium hover:underline"
                      >
                        Request Access
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
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
            <Shield className="w-12 h-12 text-[var(--primary)] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              Have Security Questions?
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
              Our team is ready to walk through our security architecture, compliance posture, and answer any questions your security team may have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors text-lg shadow-lg shadow-[var(--primary)]/30"
              >
                Schedule Security Review
              </Link>
              <a
                href="mailto:hello@trueaim.ai"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-medium hover:bg-[var(--primary-light)] transition-colors text-lg"
              >
                hello@trueaim.ai
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
