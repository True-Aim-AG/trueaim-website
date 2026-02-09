import Link from "next/link";

export default function PAIAPage() {
  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
          PAIA Manual
        </h1>
        <p className="text-sm text-[var(--text-muted)] mb-8">
          Last updated: 08 February 2026
        </p>

        <div className="glass-panel p-8 md:p-12 space-y-8">
          <p className="text-sm text-[var(--text-muted)] italic">
            Prepared in accordance with the Promotion of Access to Information Act, 2 of 2000
          </p>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">1. Introduction</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              This PAIA Manual has been prepared in accordance with section 51 of the Promotion of Access to Information Act, 2000 (&ldquo;PAIA&rdquo;) and incorporates the relevant requirements of the Protection of Personal Information Act, 2013 (&ldquo;POPIA&rdquo;). The purpose of this Manual is to set out the procedures for requesting access to records held by <strong>True Aim AG</strong> and to provide information required by PAIA and POPIA.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">2. Company details</h2>
            <div className="space-y-2 text-[var(--text-secondary)] leading-relaxed">
              <p><span className="font-medium text-[var(--text-primary)]">Company name:</span> True Aim AG</p>
              <p><span className="font-medium text-[var(--text-primary)]">Registration number:</span> CHE-325.128.066</p>
              <p><span className="font-medium text-[var(--text-primary)]">Registered office:</span> Zug, Switzerland</p>
              <p><span className="font-medium text-[var(--text-primary)]">Registered address:</span> c/o Yarowa AG, Metallstrasse 9, 6300 Zug, Switzerland</p>
              <p><span className="font-medium text-[var(--text-primary)]">Contact email:</span>{" "}
                <a href="mailto:info@trueaim.ai" className="text-[var(--primary)] hover:underline">info@trueaim.ai</a>
              </p>
            </div>
            <p className="text-[var(--text-secondary)] leading-relaxed mt-4">
              True Aim AG is a Swiss-based company operating globally, including certain data processing activities relating to South Africa.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">3. Information Officer</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              The Information Officer of True Aim AG is the <strong>Chief Executive Officer (CEO) of True Aim AG</strong>. No Deputy Information Officer has been appointed.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mt-2">
              All PAIA and POPIA-related requests must be submitted by email to:{" "}
              <a href="mailto:info@trueaim.ai" className="text-[var(--primary)] hover:underline font-medium">info@trueaim.ai</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">4. Guide on how to use PAIA</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              The South African Human Rights Commission has compiled a guide explaining how to use PAIA, including how to submit access requests. This guide is available from the Commission&apos;s website or offices.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">5. Records available without a PAIA request</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              The following records are available without submitting a formal PAIA request:
            </p>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2 flex-shrink-0" />
                Information published on the True Aim website
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2 flex-shrink-0" />
                Public marketing materials
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2 flex-shrink-0" />
                Published blog articles and case studies
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2 flex-shrink-0" />
                Public corporate or regulatory disclosures
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">6. Categories of records held</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              True Aim AG may hold records relating to its corporate administration, commercial operations, financial affairs, personnel, information systems, business relationships and compliance obligations, including personal information as defined under POPIA. Access to such records is subject to the limitations and grounds for refusal set out in PAIA and other applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">7. Records relating to personal information (POPIA)</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              True Aim AG processes personal information for legitimate business purposes, including:
            </p>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2 flex-shrink-0" />
                Contact and enquiry handling
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2 flex-shrink-0" />
                Demo requests and meeting scheduling
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2 flex-shrink-0" />
                Business communications
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2 flex-shrink-0" />
                Operational and administrative purposes
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2 flex-shrink-0" />
                Legal or regulatory compliance
              </li>
            </ul>
            <p className="text-[var(--text-secondary)] leading-relaxed mt-4">
              Personal information is processed primarily in <strong>Switzerland</strong>, with appropriate technical and organisational safeguards in place. Where personal information relates to South African data subjects, processing is conducted in a manner aligned with POPIA principles.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">8. Request procedure</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Requests for access to records must be submitted in writing by email to the Information Officer at{" "}
              <a href="mailto:info@trueaim.ai" className="text-[var(--primary)] hover:underline font-medium">info@trueaim.ai</a>. The requester must provide sufficient detail to identify the record requested and indicate the form of access required. Proof of identity is required before a request is processed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">9. Fees</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Where applicable, a request fee may be charged in accordance with PAIA. Any applicable fees will be communicated before the request is processed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">10. Grounds for refusal</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Access to records may be refused on grounds set out in PAIA, including but not limited to the protection of personal information, confidential commercial information, intellectual property and trade secrets, legal privilege and security or safety considerations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">11. Availability of this Manual</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              The latest version of the PAIA Manual will always be available on this page or upon request if a later version exists but has not been published yet. You may request it via email at{" "}
              <a href="mailto:info@trueaim.ai" className="text-[var(--primary)] hover:underline font-medium">info@trueaim.ai</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">12. Updates</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              This Manual may be updated from time to time to reflect changes in legislation or business practices.
            </p>
          </section>

          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
