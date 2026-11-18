import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import {
  ClaimScene,
  CoverageGlassScene,
  DamageGlassScene,
  FlowGlassScene,
  FlowScene,
  InvoiceGlassScene,
  InvoiceScene,
  LineBenchGlassScene,
  LineBenchScene,
  ModulesDiagram,
  OtusGlassScene,
  OtusPrompts,
  ProductRail,
  OutcomesScene,
  RecordScene,
  RoutingGlassScene,
  ScopeGlassScene,
  ReportScene,
} from "@/components/products";

// next-intl's navigation cannot load under Vitest's Node resolver, so Link becomes a plain anchor.
vi.mock("@/i18n/navigation", async () => {
  const { createElement } = await import("react");
  return {
    Link: ({ href, children, ...rest }: { href: string; children?: React.ReactNode }) =>
      createElement("a", { href, ...rest }, children),
  };
});

describe("ModulesDiagram", () => {
  it("renders an ordered list of modules and the feature rails", () => {
    const html = renderToStaticMarkup(
      <ModulesDiagram
        heading="Modules"
        input={{ name: "Input", text: "In" }}
        modules={[
          { name: "Otus", text: "Ask", href: "/platform/otus" },
          { name: "Decide", text: "Checks each line" },
        ]}
        output={{ name: "Output", text: "Out" }}
        features={[{ name: "Rail one", text: "R1" }, { name: "Rail two", text: "R2" }]}
        featuresHeading="Features"
      />,
    );
    expect(html).toContain("<ol");
    expect(html.match(/<ol[\s\S]*<\/ol>/)?.[0].match(/<li/g)).toHaveLength(2);
    expect(html.match(/<a /g)).toHaveLength(1);
    expect(html).toContain("Rail one");
    expect(html).toContain("Rail two");
    expect(html).toContain("sr-only");
  });
});

describe("OtusPrompts", () => {
  it("selects the first tab and shows its panel", () => {
    const html = renderToStaticMarkup(
      <OtusPrompts
        label="Example prompts"
        footer="No decision rights."
        youLabel="You"
        otusLabel="Otus"
        prompts={[
          { id: "a", tab: "Tab A", prompt: "Prompt A", answer: ["Answer A"], actions: ["Act A"] },
          { id: "b", tab: "Tab B", prompt: "Prompt B", answer: ["Answer B"] },
        ]}
      />,
    );
    expect(html).toContain('role="tablist"');
    expect(html.match(/aria-selected="true"/g)).toHaveLength(1);
    expect(html.match(/tabindex="-1"/g)).toHaveLength(1);
    expect(html).toContain('role="tabpanel"');
    expect(html).toContain("Prompt A");
    expect(html).toContain("Answer A");
    expect(html).toContain("Act A");
    expect(html).not.toContain("Prompt B");
  });
});

describe("Product scenes", () => {
  it("renders the claim scene as one image with its lines and payout", () => {
    const html = renderToStaticMarkup(
      <ClaimScene
        data={{
          alt: "A claim",
          title: "Water damage claim",
          reference: "Claim 1",
          columns: { description: "Description", quantity: "Qty", claimed: "Claimed", covered: "Covered" },
          groups: [
            { kind: "approved", label: "Covered", total: "10", lines: [{ description: "Floor", quantity: "1", claimed: "10", covered: "10" }] },
            { kind: "denied", label: "Excluded", total: "0", lines: [{ description: "Dishwasher", quantity: "1", claimed: "5", covered: "0" }] },
          ],
          deductibleLabel: "Deductible",
          deductible: "1",
          payoutLabel: "Payout",
          payout: "9",
        }}
      />,
    );
    expect(html).toContain('role="img"');
    expect(html).toContain('aria-label="A claim"');
    expect(html).toContain("Dishwasher");
    expect(html).toContain("Payout");
  });

  it("renders the coverage hero as one image, each line linked to its clause, with a pause control", () => {
    const html = renderToStaticMarkup(
      <CoverageGlassScene
        data={{
          alt: "A claim checked line by line",
          title: "Water damage claim",
          reference: "Claim 1",
          columns: { description: "Description", quantity: "Qty", claimed: "Claimed", covered: "Covered" },
          groups: [
            { kind: "approved", label: "Covered", total: "10", lines: [{ description: "Floor", quantity: "1", claimed: "10", covered: "10" }] },
            { kind: "denied", label: "Excluded", total: "0", lines: [{ description: "Dishwasher", quantity: "1", claimed: "5", covered: "0" }] },
          ],
          deductibleLabel: "Deductible",
          deductible: "1",
          payoutLabel: "Payout",
          payout: "9",
          policyLabel: "Policy wording",
          clauseWord: "Clause",
          clauses: [
            { ref: "3.1", text: "Water damage is covered." },
            { ref: "4.2", text: "Appliances are excluded." },
          ],
          adjuster: { label: "Your adjuster", action: "Approve payout" },
          pause: "Pause animation",
          play: "Play animation",
        }}
      />,
    );
    expect(html).toContain('aria-label="A claim checked line by line"');
    // A desktop and a phone layout, each with one connector per line.
    expect(html.match(/data-stage="/g)).toHaveLength(2);
    expect(html.match(/<path [^>]*data-path=/g)).toHaveLength(4);
    expect(html).toContain("Appliances are excluded.");
    expect(html).toContain("Approve payout");
    expect(html).toContain('aria-label="Pause animation"');
  });

  it("renders the claim flow as one image: channels, one record with True Aim, every party, and a pause control", () => {
    const html = renderToStaticMarkup(
      <FlowGlassScene
        data={{
          alt: "Claims arrive and every party is updated",
          channelsLabel: "Arrives on any channel",
          channels: ["WhatsApp", "Email", "Client portal", "Repairer"],
          record: {
            title: "One claim record",
            fields: [
              { label: "Claimant", value: "A. Meier" },
              { label: "Policy", value: "P-1" },
              { label: "Incident", value: "Water damage" },
              { label: "Documents", value: "4 read" },
            ],
            status: "Contextualised",
          },
          partiesLabel: "Every party in the loop",
          parties: [
            { name: "Customer", text: "Reference sent" },
            { name: "Broker", text: "Record shared" },
            { name: "Repairer", text: "Estimate requested" },
            { name: "Adjuster", text: "Assigned" },
          ],
          pause: "Pause animation",
          play: "Play animation",
        }}
      />,
    );
    expect(html).toContain('aria-label="Claims arrive and every party is updated"');
    // A desktop and a stacked layout, each with eight travelling items.
    expect(html.match(/data-stage="/g)).toHaveLength(2);
    expect(html.match(/data-item=/g)).toHaveLength(16);
    expect(html).toContain("One claim record");
    expect(html).toContain("Estimate requested");
    expect(html).not.toContain("Contextualised");
    expect(html).toContain('aria-label="Pause animation"');
  });

  it("renders the invoice, report and outcomes scenes from their data", () => {
    const invoice = renderToStaticMarkup(
      <InvoiceScene
        data={{
          alt: "An invoice",
          title: "INV-1",
          subtitle: "Garage",
          count: "2 lines",
          lines: [
            { kind: "denied", description: "Paint", amount: "100" },
            { kind: "approved", description: "Labour", amount: "50" },
          ],
          totalLabel: "Total",
          total: "150",
          summaryLabel: "Against the benchmark",
          action: { title: "Reissue request drafted", text: "Paint", saveLabel: "Save", save: "40" },
          rows: [{ kind: "approved", label: "In range", count: "1 line" }],
        }}
      />,
    );
    expect(invoice).toContain("Reissue request drafted");
    expect(invoice).toContain("40");
    const report = renderToStaticMarkup(
      <ReportScene
        data={{
          alt: "A report",
          photosLabel: "2 photographs received",
          files: [{ name: "a.jpg", meta: "1 MB" }],
          title: "Damage report",
          subtitle: "Kitchen",
          lines: [{ item: "Flooring", quantity: "14 m²", amount: "1'260" }],
          estimateLabel: "Estimate",
          estimate: "1'260",
        }}
      />,
    );
    expect(report).toContain("Flooring");
    expect(report).toContain("Estimate");
    const outcomes = renderToStaticMarkup(
      <OutcomesScene alt="Three outcomes" items={[{ icon: "decision", title: "A settled claim" }]} />,
    );
    expect(outcomes).toContain('aria-label="Three outcomes"');
    expect(outcomes).toContain("A settled claim");
  });

  it("renders the flow and the record with its timeline, and the benchmark starting on its first line", () => {
    const flow = renderToStaticMarkup(
      <FlowScene
        data={{
          alt: "Flow",
          channelsLabel: "Arrives on any channel",
          channels: ["Email"],
          record: { title: "One claim record", fields: [{ label: "Policy", value: "P-1" }], status: "Contextualised" },
          partiesLabel: "Every party in the loop",
          parties: [{ name: "Customer", text: "Status page live" }],
        }}
      />,
    );
    expect(flow).toContain("One claim record");
    expect(flow).toContain("Contextualised");
    const record = renderToStaticMarkup(
      <RecordScene
        data={{
          alt: "Record",
          title: "Claim record",
          subtitle: "Claim 1",
          tabs: { timeline: "Timeline", forensic: "Forensic view" },
          phases: ["Received", "Settled"],
          rows: [
            { time: "09:00", actor: "agent", who: "Agent", text: "Read", hash: "a1" },
            { time: "09:01", actor: "human", who: "Adjuster", text: "Confirmed", hash: "b2" },
          ],
          groups: { agent: "Agents", engine: "Rules engine", human: "Adjuster" },
          actions: { one: "action", many: "actions" },
          verified: "Chain verified",
          exportLabel: "Export audit pack",
        }}
      />,
    );
    expect(record.match(/aria-pressed="true"/g)).toHaveLength(1);
    expect(record).toContain("Confirmed");
    expect(record).toContain("Export audit pack");
    const bench = renderToStaticMarkup(
      <LineBenchScene
        data={{
          alt: "Bench",
          label: "Invoice",
          rangeLabel: "Expected range",
          axis: { low: "Lower", high: "Higher" },
          bars: [10, 50, 10],
          lines: [
            { kind: "approved", description: "Labour", status: "In range", amount: "10", range: "r", position: 50, marker: "0%", foot: [{ label: "Saved", value: "0" }] },
            { kind: "denied", description: "Paint", status: "28% above", amount: "100", range: "r", position: 72, marker: "+28%", foot: [{ label: "Saved", value: "40", ok: true }] },
          ],
        }}
      />,
    );
    expect(bench.match(/aria-pressed="true"/g)).toHaveLength(1);
    expect(bench).toContain("0%");
    expect(bench).not.toContain("+28%");
  });

  it("renders the invoice hero as one image with the reissue request, the adjuster and a pause control", () => {
    const html = renderToStaticMarkup(
      <InvoiceGlassScene
        data={{
          alt: "An invoice checked line by line",
          title: "Invoice 1",
          supplier: "Builder, Lausanne",
          columns: { line: "Line", benchmark: "Benchmark", amount: "Amount" },
          lines: [
            { kind: "approved", description: "Flooring", amount: "100", position: 50 },
            { kind: "denied", description: "Drying", amount: "64", position: 88 },
          ],
          totalLabel: "Total",
          total: "164",
          summaryLabel: "Against the benchmark",
          tally: [
            { kind: "approved", label: "In range" },
            { kind: "denied", label: "Over benchmark" },
          ],
          reissue: { title: "Reissue request drafted", line: "Drying", invoicedLabel: "Invoiced", invoiced: "64", expectedLabel: "Expected", expected: "46", saveLabel: "Potential saving", save: "18" },
          adjuster: { label: "Your adjuster", action: "Send request" },
          pause: "Pause animation",
          play: "Play animation",
        }}
      />,
    );
    expect(html.match(/role="img"/g)).toHaveLength(1);
    expect(html).toContain('aria-label="An invoice checked line by line"');
    // Desktop and phone stages each hold every line.
    expect(html.match(/data-row/g)).toHaveLength(4);
    expect(html).toContain("Reissue request drafted");
    expect(html).toContain("Potential saving");
    expect(html).toContain("Send request");
    expect(html).toContain('aria-label="Pause animation"');
  });

  it("renders the line benchmark as one image with every line's figures and a pause control", () => {
    const html = renderToStaticMarkup(
      <LineBenchGlassScene
        data={{
          alt: "Bench",
          label: "Invoice",
          rangeLabel: "Expected range",
          axis: { low: "Lower", high: "Higher" },
          bars: [10, 50, 10],
          lines: [
            { kind: "approved", description: "Flooring", status: "In range", amount: "10", range: "r", position: 50, marker: "+1%", foot: [{ label: "Median", value: "9" }] },
            { kind: "denied", description: "Drying", status: "39% above", amount: "64", range: "r", position: 80, marker: "+39%", foot: [{ label: "Potential saving", value: "18", ok: true }] },
          ],
          pause: "Pause animation",
          play: "Play animation",
        }}
      />,
    );
    expect(html.match(/role="img"/g)).toHaveLength(1);
    expect(html.match(/data-pin/g)).toHaveLength(4);
    expect(html).toContain("+39%");
    expect(html).toContain("Potential saving");
    expect(html).not.toContain("aria-pressed");
    expect(html).toContain('aria-label="Pause animation"');
  });

  it("renders the damage hero as one image: each photograph, the report line written from it, the adjuster and a pause control", () => {
    const html = renderToStaticMarkup(
      <DamageGlassScene
        data={{
          alt: "Photographs become a damage report",
          photosLabel: "2 photographs received",
          files: [
            { name: "kitchen_01.jpg", size: "2.4 MB" },
            { name: "wall_04.jpg", size: "2.6 MB" },
          ],
          title: "Damage report",
          subtitle: "Water damage, kitchen",
          columns: { item: "Line", quantity: "Qty", amount: "Amount" },
          lines: [
            { item: "Flooring", finding: "Water ingress", quantity: "14 m²", amount: "1'260" },
            { item: "Wall, repaint", finding: "Damp patch", quantity: "12 m²", amount: "340" },
          ],
          estimateLabel: "Estimate",
          estimate: "1'600",
          adjuster: { label: "Your adjuster", action: "Review report" },
          pause: "Pause animation",
          play: "Play animation",
        }}
      />,
    );
    expect(html.match(/role="img"/g)).toHaveLength(1);
    // Desktop and phone stages each hold every photograph, every line and one connector per photograph.
    expect(html.match(/data-file/g)).toHaveLength(4);
    expect(html.match(/data-row/g)).toHaveLength(4);
    expect(html.match(/data-path/g)).toHaveLength(4);
    expect(html).toContain("Water ingress");
    expect(html).toContain("Review report");
    expect(html).toContain('aria-label="Pause animation"');
  });

  it("renders the scope of work as one image with a bar per trade, and the routing as one image with a route per desk", () => {
    const scope = renderToStaticMarkup(
      <ScopeGlassScene
        data={{
          alt: "The scope of work as a schedule",
          title: "Scope of work",
          dayLabel: "Working day",
          days: 3,
          trades: [
            { name: "Drying", task: "Drying equipment, 2 days", start: 1, length: 2, amount: "640" },
            { name: "Painting", task: "Wall, repaint", start: 3, length: 1, amount: "340" },
          ],
          durationLabel: "Duration",
          duration: "3 working days",
          totalLabel: "Estimate",
          total: "980",
          adjuster: { label: "Your adjuster", action: "Release to trades" },
          pause: "Pause animation",
          play: "Play animation",
        }}
      />,
    );
    expect(scope.match(/role="img"/g)).toHaveLength(1);
    expect(scope.match(/data-bar/g)).toHaveLength(4);
    expect(scope).toContain("Release to trades");
    expect(scope).toContain('aria-label="Pause animation"');

    const routing = renderToStaticMarkup(
      <RoutingGlassScene
        data={{
          alt: "A claim is routed by the insurer's rules",
          note: "An example.",
          claimLabel: "Claim",
          rulesLabel: "Your routing rules",
          items: [
            { id: "desk", desk: "Adjuster's desk", when: "The report is complete." },
            { id: "senior", desk: "Senior adjuster", when: "Judgement is needed." },
          ],
          pause: "Pause animation",
          play: "Play animation",
        }}
      />,
    );
    expect(routing.match(/role="img"/g)).toHaveLength(1);
    // Desktop and phone stages each hold every desk and one route per desk.
    expect(routing.match(/data-desk/g)).toHaveLength(4);
    expect(routing.match(/data-route/g)).toHaveLength(4);
    expect(routing).toContain("Judgement is needed.");
    expect(routing).toContain('aria-label="Pause animation"');
  });

  it("renders the Otus hero as one image: each scenario's question, answer lines and actions, and the line on decision rights", () => {
    const html = renderToStaticMarkup(
      <OtusGlassScene
        data={{
          alt: "Otus answers an adjuster's questions",
          otusLabel: "Otus",
          placeholder: "Ask Otus anything about a claim",
          footer: "Otus has no decision rights. Your team decides.",
          items: [
            { id: "plan", prompt: "Where do I start?", lines: ["You have 14 open claims.", "Three need your judgement."], actions: ["Open 62850"] },
            { id: "explain", prompt: "Why was line 4 excluded?", lines: ["Clause 4.2 excludes the appliance."], actions: ["Open the draft", "Show clause 4.2"] },
          ],
          pause: "Pause animation",
          play: "Play animation",
        }}
      />,
    );
    expect(html.match(/role="img"/g)).toHaveLength(1);
    // Desktop and phone stages each hold every scenario and every answer line.
    expect(html.match(/data-turn/g)).toHaveLength(4);
    expect(html.match(/data-line/g)).toHaveLength(6);
    expect(html).toContain("Your team decides.");
    expect(html).toContain("Ask Otus anything about a claim");
    expect(html.match(/data-bar/g)).toHaveLength(2);
    expect(html).not.toContain('role="tab"');
    expect(html).toContain('aria-label="Pause animation"');
  });

  it("renders the product row with one open tile, its copy and link, the arrows and no pause button", () => {
    const html = renderToStaticMarkup(
      <ProductRail
        heading="What True Aim delivers"
        labels={{ previous: "Previous", next: "Next" }}
        items={[
          { key: "a", name: "Data Extraction", icon: "extraction", still: <span>still a</span>, title: "Your claims data, ready for AI", text: "One structured database.", href: "/platform/data-extraction", linkLabel: "Data Extraction" },
          { key: "b", name: "Invoice Benchmarking", icon: "match", still: <span>still b</span>, title: "Never overpay", text: "Benchmarked line by line.", href: "/platform/invoice-benchmarking", linkLabel: "Invoice Benchmarking" },
        ]}
      />,
    );
    expect(html).toContain('aria-roledescription="carousel"');
    expect(html.match(/aria-current="true"/g)).toHaveLength(1);
    expect(html).toContain('aria-label="Previous"');
    expect(html).toContain('aria-label="Next"');
    expect(html).not.toContain("Pause");
    expect(html).toContain('href="/platform/invoice-benchmarking"');
    expect(html).toContain("still b");
  });
});
