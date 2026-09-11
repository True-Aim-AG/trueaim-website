import type { ReactNode } from "react";

/**
 * The twelve scorecard questions, in one place.
 *
 * `page.tsx` renders `body`; `layout.tsx` publishes `question` and
 * `plainAnswer` as an ItemList in JSON-LD. Keeping both readings in the same
 * array is what stops the visible checklist and the machine-readable one from
 * drifting apart. Each answer sets out the standard, then how True Aim meets
 * it.
 */
export type ScorecardQuestion = {
  group: "Provenance" | "Reconstruction" | "Human judgement" | "Continuity";
  question: string;
  /** Plain-text guidance, for structured data. */
  plainAnswer: string;
  /** The same guidance with the article's emphasis, for the page. */
  body: ReactNode;
};

export const scorecardQuestions: ScorecardQuestion[] = [
  {
    group: "Provenance",
    question:
      "For any closed claim, can you trace every value the decision used back to the document and the page it came from?",
    plainAnswer:
      "The standard is a record in which every value the decision relied on points to its source: the claimed amount to the invoice line, the date of loss to the report, the cover position to the clause. A statement that the system had access to all the documents describes an input. It does not describe a record. True Aim draws a visual line from each data point to the exact place in the source document it came from, so an assessor validates instead of re-investigating. Extracted values carry that provenance down to the page and the text region, and we measure how much of each claim carries it instead of assuming the coverage is complete.",
    body: (
      <>
        <p>
          The standard is a record in which every value the decision relied on
          points to its source: the claimed amount to the invoice line, the
          date of loss to the report, the cover position to the clause. A
          statement that the system had access to all the documents describes
          an input. It does not describe a record.
        </p>
        <p>
          True Aim draws a visual line from each data point to the exact place
          in the source document it came from, so an assessor validates instead
          of re-investigating. Extracted values carry that provenance down to
          the page and the text region, and we measure how much of each claim
          carries it instead of assuming the coverage is complete.
        </p>
      </>
    ),
  },
  {
    group: "Provenance",
    question:
      "Which parts of the decision were computed by rules and which were produced by a model, and does the record show the difference?",
    plainAnswer:
      "The larger the share of a decision that runs on deterministic logic, the less there is to explain afterwards, because the rule is the explanation. The standard is a record that shows, line by line, which parts were computed from the wording and which were produced by a model, so that judgement is never mistaken for arithmetic. True Aim converts a policy, catalogue or rulebook into a decision tree. Where the rules cover the facts, the outcome is computed, not predicted, and the same inputs always produce the same decision. Agents read the unstructured evidence, the photographs, PDFs, handwriting, emails and free text, and turn it into the structured facts the engine needs. Each agent performs one narrow task, so when something is wrong it is immediately clear where, and it is corrected at that point. Where an item is genuinely ambiguous and no rule resolves it, a model performs the matching and the record marks that line as probabilistic.",
    body: (
      <>
        <p>
          The larger the share of a decision that runs on deterministic logic,
          the less there is to explain afterwards, because the rule <em>is</em>{" "}
          the explanation. The standard is a record that shows, line by line,
          which parts were computed from the wording and which were produced by
          a model, so that judgement is never mistaken for arithmetic.
        </p>
        <p>
          True Aim converts a policy, catalogue or rulebook into a decision
          tree. Where the rules cover the facts, the outcome is computed, not
          predicted, and the same inputs always produce the same decision.
          Agents read the unstructured evidence, the photographs, PDFs,
          handwriting, emails and free text, and turn it into the structured
          facts the engine needs. Each agent performs one narrow task, so when
          something is wrong it is immediately clear where, and it is corrected
          at that point. Where an item is genuinely ambiguous and no rule
          resolves it, a model performs the matching and the record marks that
          line as probabilistic.
        </p>
      </>
    ),
  },
  {
    group: "Provenance",
    question:
      "What happens when the evidence is incomplete or ambiguous, and who decided that behaviour?",
    plainAnswer:
      "Uncertainty is not a failure state. It is a routing decision, and it belongs to the claims operation, not to the software. The standard is a defined behaviour the operation controls: route to a handler, hold the claim, request the missing document. A confidence score with no consequence attached to it is a number, not a control. At True Aim, thresholds, routing rules, straight-through limits and tolerances are configured by the client. A claim is decided automatically only where value, deviation and confidence all pass the tests the client has set. What the evidence confirms is separated from what only a person can confirm, so assessor time is spent where it changes the answer.",
    body: (
      <>
        <p>
          Uncertainty is not a failure state. It is a routing decision, and it
          belongs to the claims operation, not to the software. The standard is
          a defined behaviour the operation controls: route to a handler, hold
          the claim, request the missing document. A confidence score with no
          consequence attached to it is a number, not a control.
        </p>
        <p>
          At True Aim, thresholds, routing rules, straight-through limits and
          tolerances are configured by the client. A claim is decided
          automatically only where value, deviation and confidence all pass the
          tests the client has set. What the evidence confirms is separated
          from what only a person can confirm, so assessor time is spent where
          it changes the answer.
        </p>
      </>
    ),
  },
  {
    group: "Reconstruction",
    question:
      "Given the same claim and the same documents a year later, would the decision be the same, and could you prove it?",
    plainAnswer:
      "The standard is yes for every deterministic part of the decision, with the re-run to prove it, and an exact account of which parts were probabilistic and are therefore reproducible only under the model version and settings that produced them. A system that cannot reproduce its own output cannot defend it. True Aim can re-validate or re-execute a decision chain on demand. Rule-based outcomes reproduce by construction. For every model call the record holds the model, the prompt template, the engine, the temperature, the seed, the determinism setting and the confidence, so a probabilistic step can be examined under the conditions that produced it.",
    body: (
      <>
        <p>
          The standard is yes for every deterministic part of the decision,
          with the re-run to prove it, and an exact account of which parts were
          probabilistic and are therefore reproducible only under the model
          version and settings that produced them. A system that cannot
          reproduce its own output cannot defend it.
        </p>
        <p>
          True Aim can re-validate or re-execute a decision chain on demand.
          Rule-based outcomes reproduce by construction. For every model call
          the record holds the model, the prompt template, the engine, the
          temperature, the seed, the determinism setting and the confidence, so
          a probabilistic step can be examined under the conditions that
          produced it.
        </p>
      </>
    ),
  },
  {
    group: "Reconstruction",
    question:
      "Are the policy wording, the rules and the model that produced a decision recorded on the decision itself, at the version in force?",
    plainAnswer:
      "On the record itself, not in a release note. Version history kept elsewhere is a different document about a different day. The standard is a decision that names the clause, catalogue entry or business rule applied, at the version in force at that moment, together with the model and prompt that took part. True Aim writes every action, by a person or a machine, to the record with the model, prompt, rule version and confidence attached, and records which version of the wording, catalogue or business rule was in force when the decision was made. Decisions are judged against the rules that actually applied.",
    body: (
      <>
        <p>
          On the record itself, not in a release note. Version history kept
          elsewhere is a different document about a different day. The standard
          is a decision that names the clause, catalogue entry or business rule
          applied, at the version in force at that moment, together with the
          model and prompt that took part.
        </p>
        <p>
          True Aim writes every action, by a person or a machine, to the record
          with the model, prompt, rule version and confidence attached, and
          records which version of the wording, catalogue or business rule was
          in force when the decision was made. Decisions are judged against the
          rules that actually applied.
        </p>
      </>
    ),
  },
  {
    group: "Reconstruction",
    question:
      "Who can alter a decision record, how would you know, and how long is the record kept?",
    plainAnswer:
      "A record that can be altered without trace is a draft. The standard is a tamper-evident record and a retention period set deliberately to match the operation's own obligations, which usually outlast the claim by years. The claim you are asked about is often older than the log you kept. True Aim hashes every recorded item, so any alteration is detectable and the record is built to withstand challenge in dispute, audit or court. Retention is configured per client to match its own record-keeping obligations, and the retention status of every claim sits in the same record as its documents, events and decisions.",
    body: (
      <>
        <p>
          A record that can be altered without trace is a draft. The standard
          is a tamper-evident record and a retention period set deliberately to
          match the operation&apos;s own obligations, which usually outlast the
          claim by years. The claim you are asked about is often older than the
          log you kept.
        </p>
        <p>
          True Aim hashes every recorded item, so any alteration is detectable
          and the record is built to withstand challenge in dispute, audit or
          court. Retention is configured per client to match its own
          record-keeping obligations, and the retention status of every claim
          sits in the same record as its documents, events and decisions.
        </p>
      </>
    ),
  },
  {
    group: "Human judgement",
    question:
      "At the moment of sign-off, what does the reviewer actually see, and can they change the outcome?",
    plainAnswer:
      "A review step protects the customer only when the reviewer sees the recommendation, the evidence behind it and the assumptions beneath it, and holds the authority to change any of them. A reviewer who sees only a verdict is approving a conclusion, not reviewing a claim. True Aim produces a recommendation with its full reasoning for a person to confirm. Every assumption behind the determination is stated on a coverage assumptions panel and can be overridden, every line carries the clause or rule it rests on, and every total recalculates live as cover is toggled, so the handler sees the financial effect of a change before committing to it.",
    body: (
      <>
        <p>
          A review step protects the customer only when the reviewer sees the
          recommendation, the evidence behind it and the assumptions beneath
          it, and holds the authority to change any of them. A reviewer who
          sees only a verdict is approving a conclusion, not reviewing a claim.
        </p>
        <p>
          True Aim produces a recommendation with its full reasoning for a
          person to confirm. Every assumption behind the determination is
          stated on a coverage assumptions panel and can be overridden, every
          line carries the clause or rule it rests on, and every total
          recalculates live as cover is toggled, so the handler sees the
          financial effect of a change before committing to it.
        </p>
      </>
    ),
  },
  {
    group: "Human judgement",
    question:
      "When a handler overrides the system, is the reason captured, and does anyone learn from it?",
    plainAnswer:
      "Overrides are the most valuable quality signal a claims operation owns. Each one is a case in which an experienced person disagreed with the system, and the reason is either captured and studied or lost. The standard is a mandatory reason on every override and a routine that reads them. True Aim requires a reason for every human change and flags goodwill separately, so that a payment made outside cover never trains the model. Human and automated decisions are counted side by side in the claim record, which gives the operation a clean audit trail and clean training data at the same time.",
    body: (
      <>
        <p>
          Overrides are the most valuable quality signal a claims operation
          owns. Each one is a case in which an experienced person disagreed
          with the system, and the reason is either captured and studied or
          lost. The standard is a mandatory reason on every override and a
          routine that reads them.
        </p>
        <p>
          True Aim requires a reason for every human change and flags goodwill
          separately, so that a payment made outside cover never trains the
          model. Human and automated decisions are counted side by side in the
          claim record, which gives the operation a clean audit trail and clean
          training data at the same time.
        </p>
      </>
    ),
  },
  {
    group: "Human judgement",
    question:
      "Could you explain any single decision to the claimant, in plain language, from the record alone?",
    plainAnswer:
      "The person on the other side of a claim is entitled to understand why it was decided as it was. The standard is an explanation assembled from the record itself: the facts relied on, the clause applied and the calculation performed, in language the claimant can follow. If the explanation has to be reconstructed by hand, the record was incomplete. True Aim decides cover line by line, each line justified against a specific clause or configured business rule, quoted and explained, with the arithmetic for excess, limits, caps and liability set out in full. Rejected lines are struck through on the source document itself and exported as a PDF, so the customer sees the reasoning against their own invoice.",
    body: (
      <>
        <p>
          The person on the other side of a claim is entitled to understand why
          it was decided as it was. The standard is an explanation assembled
          from the record itself: the facts relied on, the clause applied and
          the calculation performed, in language the claimant can follow. If
          the explanation has to be reconstructed by hand, the record was
          incomplete.
        </p>
        <p>
          True Aim decides cover line by line, each line justified against a
          specific clause or configured business rule, quoted and explained,
          with the arithmetic for excess, limits, caps and liability set out in
          full. Rejected lines are struck through on the source document itself
          and exported as a PDF, so the customer sees the reasoning against
          their own invoice.
        </p>
      </>
    ),
  },
  {
    group: "Continuity",
    question:
      "How does the system perform on claims it has never seen, and what changed after the last such test?",
    plainAnswer:
      "An accuracy figure measured on the claims a system was tuned against measures familiarity, not competence. The standard is a test on claims the system has never seen, labelled by an experienced adjuster, with the failure modes written down and the remedy recorded. At True Aim, thirty unseen claims surfaced failure modes the development set had not covered, which is precisely what such a test is for. Closing the gap meant more ground truth and, for the payout formula, sitting with an adjuster and walking the calculations by hand. No amount of prompt engineering fixes a business-logic error. That work is what decides whether a pilot reaches production.",
    body: (
      <>
        <p>
          An accuracy figure measured on the claims a system was tuned against
          measures familiarity, not competence. The standard is a test on
          claims the system has never seen, labelled by an experienced
          adjuster, with the failure modes written down and the remedy
          recorded.
        </p>
        <p>
          At True Aim, thirty unseen claims surfaced failure modes the
          development set had not covered, which is precisely what such a test
          is for. Closing the gap meant more ground truth and, for the payout
          formula, sitting with an adjuster and walking the calculations by
          hand. No amount of prompt engineering fixes a business-logic error.
          That work is what decides whether a pilot reaches production.
        </p>
      </>
    ),
  },
  {
    group: "Continuity",
    question:
      "If you change systems, do the decision records leave with you in a form you can read without the software?",
    plainAnswer:
      "Decision records belong to the claims operation, not to the software that produced them. The standard is an export a person can read without the system: the documents, the decisions, the reasons and the versions, in an open format. An audit trail that only opens inside the system that produced it is not an audit trail. True Aim exports the complete record of a claim, every action by a person or a machine with its model, prompt, rule version and confidence attached, as a single audit pack in one click.",
    body: (
      <>
        <p>
          Decision records belong to the claims operation, not to the software
          that produced them. The standard is an export a person can read
          without the system: the documents, the decisions, the reasons and the
          versions, in an open format. An audit trail that only opens inside
          the system that produced it is not an audit trail.
        </p>
        <p>
          True Aim exports the complete record of a claim, every action by a
          person or a machine with its model, prompt, rule version and
          confidence attached, as a single audit pack in one click.
        </p>
      </>
    ),
  },
  {
    group: "Continuity",
    question:
      "Where is claim data processed, by whom, and who is accountable for each decision made in your name?",
    plainAnswer:
      "A claims operation remains accountable for every decision made in its name, whichever software made it. Swiss supervision is explicit on the point: FINMA expects institutions that use AI to align their governance, risk management and control systems accordingly, and an insurer that outsources a function remains accountable to FINMA as if it performed that function itself. The standard is a published list of processors, a known processing location and a record that shows, for every decision, whether a person or a system made it. True Aim stores and processes customer data on Microsoft Azure in the Switzerland North region and does not transfer it outside Switzerland for routine processing. Our list of sub-processors is published, with the service, the data categories and the processing location for each. The claim record counts human and automated decisions separately and lists every action chronologically by actor, so accountability is visible for every decision, not asserted for the whole.",
    body: (
      <>
        <p>
          A claims operation remains accountable for every decision made in its
          name, whichever software made it. Swiss supervision is explicit on
          the point: FINMA expects institutions that use AI to align their
          governance, risk management and control systems accordingly, and an
          insurer that outsources a function remains accountable to FINMA as if
          it performed that function itself. The standard is a published list
          of processors, a known processing location and a record that shows,
          for every decision, whether a person or a system made it.
        </p>
        <p>
          True Aim stores and processes customer data on Microsoft Azure in the
          Switzerland North region and does not transfer it outside Switzerland
          for routine processing. Our list of sub-processors is published, with
          the service, the data categories and the processing location for
          each. The claim record counts human and automated decisions
          separately and lists every action chronologically by actor, so
          accountability is visible for every decision, not asserted for the
          whole.
        </p>
      </>
    ),
  },
];
