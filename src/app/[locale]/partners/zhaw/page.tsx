import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, GraduationCap, Brain, Users, FlaskConical } from "lucide-react";

export default function ZHAWPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--aurora-cyan)]/20 text-[var(--aurora-cyan)] text-sm font-medium mb-6">
            <GraduationCap className="w-4 h-4" />
            Research Partner
          </div>

          <div className="flex justify-center mb-8">
            <Image
              src="/partners/zhaw-logo.png"
              alt="ZHAW logo"
              width={160}
              height={120}
              className="object-contain"
            />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
            ZHAW Research
            <br />
            <span className="text-[var(--primary)]">Partnership</span>
          </h1>

          <div className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed space-y-4">
            <p>
              Parts of True Aim&apos;s innovative technology is developed in collaboration with ZHAW Zurich University of Applied Sciences, one of Switzerland&apos;s leading applied research universities, recognised for deep-tech research in AI, data science and engineering with a strong focus on real-world deployment.
            </p>
            <p>
              The work is supported through Innosuisse innovation funding, with ZHAW as the formal research partner and True Aim as the industry implementation partner, advancing transparent and regulation-ready neuro-symbolic AI for highly regulated industries.
            </p>
          </div>
        </div>
      </section>

      {/* Research Focus */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-12 text-center">
            Research Focus Areas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel glass-panel-hover p-8">
              <div className="w-14 h-14 rounded-xl bg-[var(--aurora-cyan)]/20 flex items-center justify-center mb-6">
                <Brain className="w-7 h-7 text-[var(--aurora-cyan)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                Neuro-Symbolic AI
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Combining the flexibility of neural networks with the precision of symbolic reasoning. Our research focuses on making AI decisions deterministic and fully explainable.
              </p>
            </div>

            <div className="glass-panel glass-panel-hover p-8">
              <div className="w-14 h-14 rounded-xl bg-[var(--aurora-cyan)]/20 flex items-center justify-center mb-6">
                <FlaskConical className="w-7 h-7 text-[var(--aurora-cyan)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                Logic Extraction & Automation
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Developing methods to extract formal logic from natural-language policy documents and transform it into computable decision rules.
              </p>
            </div>

            <div className="glass-panel glass-panel-hover p-8">
              <div className="w-14 h-14 rounded-xl bg-[var(--aurora-cyan)]/20 flex items-center justify-center mb-6">
                <GraduationCap className="w-7 h-7 text-[var(--aurora-cyan)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                Deterministic Decisioning
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Ensuring that identical inputs always produce identical outputs, with complete traceability from decision to source text. Critical for regulatory compliance.
              </p>
            </div>

            <div className="glass-panel glass-panel-hover p-8">
              <div className="w-14 h-14 rounded-xl bg-[var(--aurora-cyan)]/20 flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-[var(--aurora-cyan)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                Applied Industry Research
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Bridging academic research and real-world insurance operations. Testing and validating approaches against actual claims data and policy documents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Institution Details */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-panel p-8 md:p-12">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">About the Research Group</h2>

            <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
              <p>
                The research is hosted within ZHAW&apos;s <span className="font-medium text-[var(--text-primary)]">School of Engineering</span>, specifically the <span className="font-medium text-[var(--text-primary)]">Institute of Applied Information Technology (InIT)</span> and the <span className="font-medium text-[var(--text-primary)]">Centre for Artificial Intelligence (CAI)</span>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="glass-panel-light p-6 text-center">
                  <div className="flex justify-center mb-3">
                    <Image
                      src="/team/dandolo-flumini.jpg"
                      alt="Dr. Dandolo Flumini"
                      width={80}
                      height={80}
                      className="rounded-full object-cover w-20 h-20"
                    />
                  </div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-2">Dr. Dandolo Flumini</h3>
                  <p className="text-sm text-[var(--text-muted)]">
                    Original developer of the MIRA technology. PhD in Mathematics and Computer Science. Leads True Aim's Innosuisse-funded Innovation Project.
                  </p>
                </div>
                <div className="glass-panel-light p-6 text-center">
                  <div className="flex justify-center mb-3">
                    <Image
                      src="/team/lukas-lichtensteiger.jpg"
                      alt="Dr. Lukas Lichtensteiger"
                      width={80}
                      height={80}
                      className="rounded-full object-cover w-20 h-20"
                    />
                  </div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-2">Dr. Lukas Lichtensteiger</h3>
                  <p className="text-sm text-[var(--text-muted)]">
                    Harvard alumnus, serial entrepreneur and CTO. ZHAW researcher in AI and robotics. True Aim technical advisor.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href="https://www.zhaw.ch/en/about-us/person/flum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--primary)] font-medium hover:underline"
                >
                  Visit ZHAW
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-panel p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              See the Research in Action
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-10">
              Discover how our ZHAW-rooted technology delivers auditable claims decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/technology"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors text-lg shadow-lg shadow-[var(--primary)]/30"
              >
                Explore Our Technology
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-medium hover:bg-[var(--primary-light)] transition-colors text-lg"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
