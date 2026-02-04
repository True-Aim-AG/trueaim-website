import Link from "next/link";

export default function PAIAPage() {
  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
          PAIA Manual
        </h1>
        <p className="text-sm text-[var(--text-muted)] mb-8">
          Promotion of Access to Information Act (PAIA) Manual
        </p>

        <div className="glass-panel p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Company Information</h2>
            <div className="space-y-2 text-[var(--text-secondary)] leading-relaxed">
              <p><span className="font-medium text-[var(--text-primary)]">Company name:</span> TrueAim AG</p>
              <p><span className="font-medium text-[var(--text-primary)]">Registration:</span> Switzerland</p>
              <p><span className="font-medium text-[var(--text-primary)]">Information Officer:</span> Reuben John, CEO</p>
              <p><span className="font-medium text-[var(--text-primary)]">Email:</span>{" "}
                <a href="mailto:legal@trueaim.ai" className="text-[var(--primary)] hover:underline">legal@trueaim.ai</a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Guide from the South African Human Rights Commission (SAHRC)</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              The SAHRC has compiled a guide as required by Section 10 of PAIA. This guide is available from the SAHRC and contains information to assist a person wishing to exercise any right contemplated in PAIA. The guide is available at{" "}
              <span className="text-[var(--text-muted)]">www.sahrc.org.za</span> or by contacting the SAHRC.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Records Held by TrueAim AG</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              The following categories of records are held by TrueAim AG:
            </p>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2 flex-shrink-0" />
                <span><span className="font-medium text-[var(--text-primary)]">Company records:</span> Incorporation documents, memorandum and articles of association, minutes of board meetings</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2 flex-shrink-0" />
                <span><span className="font-medium text-[var(--text-primary)]">Financial records:</span> Annual financial statements, accounting records, banking records, tax records</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2 flex-shrink-0" />
                <span><span className="font-medium text-[var(--text-primary)]">Personnel records:</span> Employment contracts, HR policies, payroll records</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2 flex-shrink-0" />
                <span><span className="font-medium text-[var(--text-primary)]">Client records:</span> Contracts, correspondence, service records</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2 flex-shrink-0" />
                <span><span className="font-medium text-[var(--text-primary)]">Intellectual property:</span> Patents, trademarks, software licences, research documentation</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Request Process</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              A request for access to records must be made on the prescribed form (Form C) and submitted to the Information Officer. The request must:
            </p>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2 flex-shrink-0" />
                Provide sufficient detail to identify the record(s) requested
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2 flex-shrink-0" />
                Indicate the form of access required
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2 flex-shrink-0" />
                Specify the right the requester is seeking to exercise or protect and the reason the record is required
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Applicable Fees</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              A requester who seeks access to a record containing personal information about that requester is not required to pay the request fee. For all other requests, the prescribed fees as set by the Minister of Justice and Constitutional Development are applicable. These include a request fee and an access fee.
            </p>
          </section>

          <div className="pt-6 border-t border-[var(--border)]">
            <p className="text-sm text-[var(--text-muted)] mb-1">PAIA requests and inquiries:</p>
            <a
              href="mailto:legal@trueaim.ai"
              className="text-[var(--primary)] font-medium hover:underline"
            >
              legal@trueaim.ai
            </a>
          </div>
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
