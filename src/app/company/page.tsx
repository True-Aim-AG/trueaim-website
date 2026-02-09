import Link from "next/link";
import Image from "next/image";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  ArrowRight,
  Quote,
  Users,
  Linkedin
} from "lucide-react";

const founders = [
  {
    name: "Reuben John",
    role: "Co-Founder & CEO",
    tagline: "2x Founder | Attorney | Former MD Largest Global Withholding Tax Claim Company",
    bio: "Reuben has led high-stakes operational and regulatory projects across Europe and Africa, overseeing market expansion, complex digitization and compliance initiatives for multinational clients. His background spans enterprise operations and multi-jurisdictional regulatory strategy. At True Aim, he drives vision, commercial strategy and go-to-market execution.",
    linkedin: "https://www.linkedin.com/in/reubenj/",
    image: "/team/reuben-john.jpg",
  },
  {
    name: "Frederic Brunner",
    role: "Co-Founder & CTO",
    tagline: "Ex-Zurich Insurance | Automation and System Design Expert",
    bio: "A veteran technologist with 30+ years in software development and 20+ years in enterprise automation, Frederic combines deep architectural expertise with practical delivery experience. He previously led technology transformation at Guidewire. At True Aim he drives technological development, ensuring the hybrid Agentic-AI engine meets the rigorous demands of regulated industries.",
    linkedin: "https://www.linkedin.com/in/frdbrunner/",
    image: "/team/frederic-brunner.jpg",
  },
];

interface Advisor {
  name: string;
  title: string;
  relevance: string;
  image?: string;
}

const advisors: Advisor[] = [
  {
    name: "Claudio Gienal",
    title: "AXA Group Chief Transformation Officer | Former AXA CEO UK & Ireland | Ex-McKinsey | Insurance Innovator",
    relevance: "Claims operations & insurance transformation",
  },
  {
    name: "Eric Zielinski",
    title: "Wharton | Ex-Bain | Tech Founder | Execution & Implementation Specialist",
    relevance: "Strategy & enterprise procurement",
  },
  {
    name: "Dr. Lukas Lichtensteiger",
    title: "Harvard | Serial Entrepreneur & CTO | Founder in AI & Robotics | ZHAW Researcher",
    relevance: "Technology architecture & scaling",
    image: "/team/lukas-lichtensteiger.jpg",
  },
  {
    name: "Dave Stoll",
    title: "Ex-Zurich Insurance CFO (Spain) | Founder of doppo | Fintech & Insurtech Scale-Up Specialist",
    relevance: "Insurance, fundraising & regulation",
  },
  {
    name: "Dr. Dandolo Flumini",
    title: "Original developer of Mira technology | PhD Math & Computer Science | ZHAW Researcher",
    relevance: "Core logic engine & research",
    image: "/team/dandolo-flumini.jpg",
  },
  {
    name: "Bassil Eid",
    title: "Serial Founder & CFO | Web3, Fintech & Accounting Innovator | Strategic Finance & Growth Specialist",
    relevance: "Fintech go-to-market & finance",
  },
];

const partners = [
  {
    name: "Yarowa AG",
    description: "Strategic investor and partner. Swiss InsurTech provider with deep roots in the European insurance ecosystem.",
    image: "/partners/yarowa.png",
    link: "/partners/yarowa",
  },
  {
    name: "ZHAW",
    description: "Zurich University of Applied Sciences. Research partnership following the non-dilutive grant awarded by Innosuisse.",
    image: "/partners/zhaw.jpg",
    link: "/partners/zhaw",
  },
  {
    name: "Innosuisse",
    description: "Switzerland's official innovation agency. Non-dilutive grant received by True Aim. National-level validation of our research and technology.",
    image: "/partners/innosuisse.png",
    link: "/partners/innosuisse",
  },
];

export default function CompanyPage() {
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
              <Users className="w-4 h-4" />
              About Us
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              Swiss Precision.
              <br />
              <span className="text-[var(--primary)]">Auditable AI.</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
              True Aim pioneers neuro-symbolic AI for regulated industries. We&apos;re building the decisioning engine that powers aligned, explainable decisions at scale.
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-8 md:p-12"
          >
            <div className="w-12 h-12 rounded-full bg-[var(--primary)]/20 flex items-center justify-center mb-6">
              <Quote className="w-6 h-6 text-[var(--primary)]" />
            </div>
            <blockquote className="text-base text-[var(--text-primary)] leading-relaxed font-medium">
              &ldquo;Eliminate &ldquo;black box&rdquo; AI in insurance by combining deterministic decisioning with generative AI to deliver fast, fair and auditable claim determinations that are engineered to meet the highest standards of data protection, information security and AI governance.&rdquo;
            </blockquote>
            <p className="mt-6 text-[var(--text-muted)] font-medium">Our Mission</p>
          </MotionDiv>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
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
              Deep expertise in insurance, technology and regulation
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {founders.map((founder, index) => (
              <MotionDiv
                key={founder.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel glass-panel-hover p-8"
              >
                {/* Profile Photo */}
                <div className="w-24 h-24 rounded-full overflow-hidden mb-6 ring-2 ring-[var(--border)] ring-offset-2 ring-offset-[var(--background)]">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
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
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              Advisory Board
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Guided by industry leaders and subject matter experts
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advisors.map((advisor, index) => (
              <MotionDiv
                key={advisor.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="glass-panel glass-panel-hover p-6"
              >
                {advisor.image ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden mb-4 ring-1 ring-[var(--border)]">
                    <Image
                      src={advisor.image}
                      alt={advisor.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--aurora-purple)]/30 to-[var(--aurora-cyan)]/30 flex items-center justify-center mb-4">
                    <span className="text-lg font-bold text-white">
                      {advisor.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                )}
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                  {advisor.name}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  {advisor.title}
                </p>
                {advisor.relevance && (
                  <p className="text-xs text-[var(--text-muted)] mt-1 italic">
                    {advisor.relevance}
                  </p>
                )}
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              Partners & Investors
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Supported by Switzerland&apos;s innovation ecosystem.
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <MotionDiv
                key={partner.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={partner.link}
                  className="block glass-panel glass-panel-hover p-8 transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
                >
                  <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-6 p-2">
                    <Image
                      src={partner.image}
                      alt={partner.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                    {partner.name}
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {partner.description}
                  </p>
                </Link>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              Join Us in Transforming Claims Automation in Regulated Environments
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-10">
              Whether you&apos;re an insurer looking to automate claims processing or a professional interested in joining our team, we&apos;d love to hear from you.
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
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
