import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  Shield,
  Lock,
  Key,
  FileCheck,
  Globe,
  CheckCircle,
  MapPin,
  Eye,
  History,
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
    status: "provided",
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


export default function TrustPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="relative max-w-7xl mx-auto text-center">
          <MotionDiv
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

            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
              Built from the ground up for regulated industries. Swiss precision & data security.
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Compliance Badges Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
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
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceBadges.map((badge, index) => (
              <MotionDiv
                key={badge.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel glass-panel-hover p-6"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    badge.status === 'compliant' || badge.status === 'ready' || badge.status === 'provided' || badge.status === 'aligned'
                      ? 'bg-emerald-500/20'
                      : 'bg-amber-500/20'
                  }`}>
                    <badge.icon className={`w-6 h-6 ${
                      badge.status === 'compliant' || badge.status === 'ready' || badge.status === 'provided' || badge.status === 'aligned'
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
                        badge.status === 'provided' ? 'bg-emerald-500/20 text-emerald-400' :
                        badge.status === 'aligned' ? 'bg-emerald-500/20 text-emerald-400' :
                        'bg-amber-500/20 text-amber-400'
                      }`}>
                        {badge.status === 'roadmap' ? '2026' : badge.status}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-muted)]">{badge.description}</p>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Data Residency Map */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <MotionDiv
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
                Data Residency & Sovereignty
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-6 leading-relaxed">
                Your data stays where you need it. Swiss-based hosting for maximum data sovereignty and compliance.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[var(--text-primary)]">Swiss Data Center</strong>
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
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Stylized Europe map representation */}
              <div className="glass-panel p-8 relative overflow-hidden min-h-[300px] flex items-center justify-center">
                {/* Simplified Europe outline - decorative SVG background */}
                <svg
                  viewBox="0 0 400 400"
                  className="absolute inset-0 w-full h-full opacity-[0.08]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M200 60 L220 70 L240 65 L260 80 L280 75 L300 90 L310 110 L320 130 L315 150 L325 170 L320 190 L310 210 L300 220 L290 240 L280 250 L260 260 L250 280 L240 290 L220 285 L200 290 L180 285 L170 270 L160 260 L150 240 L140 230 L130 210 L120 190 L115 170 L120 150 L115 130 L120 110 L130 90 L150 80 L170 75 L180 65 Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-slate-400"
                  />
                  <path
                    d="M100 120 L90 140 L85 160 L80 180 L85 200 L90 210 L100 220 L110 225"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-slate-400"
                  />
                  <path
                    d="M320 100 L340 110 L350 130 L345 150 L340 160"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-slate-400"
                  />
                  <path
                    d="M140 280 L130 300 L140 320 L160 330 L180 325 L200 330 L220 325 L240 330 L260 320 L270 300 L260 280"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-slate-400"
                  />
                </svg>

                <div className="absolute inset-4 border-2 border-dashed border-[var(--border)] rounded-xl" />

                {/* Switzerland marker */}
                <div className="relative z-10">
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
              </div>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
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
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {securityFeatures.map((category, index) => (
              <MotionDiv
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
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* EU AI Act Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
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
              Our neuro-symbolic architecture is purpose-built to meet the transparency, oversight and documentation requirements of the EU AI Act for high-risk AI systems.
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {euAiActFeatures.map((feature, index) => (
              <MotionDiv
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
              </MotionDiv>
            ))}
          </div>

          {/* Deterministic advantage callout */}
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 glass-panel p-8 text-center"
          >
            <FileCheck className="w-10 h-10 text-[var(--primary)] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Why Deterministic AI Matters for Compliance
            </h3>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Unlike probabilistic AI systems, our deterministic logic engine produces <strong className="text-[var(--text-primary)]">identical outputs for identical inputs</strong>, making it straightforward to demonstrate consistency, fairness and transparency to regulators.
            </p>
          </MotionDiv>
        </div>
      </section>

    </div>
  );
}
