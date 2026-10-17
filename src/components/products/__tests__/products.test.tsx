import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import {
  ClaimScene,
  FlowScene,
  InvoiceScene,
  LineBenchScene,
  ModulesDiagram,
  OtusPrompts,
  OutcomesScene,
  RecordScene,
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
        subtitle="In every True Aim solution"
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

  it("renders the flow and the record with its timeline, and the benchmark with the first line off range selected", () => {
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
    expect(bench).toContain("+28%");
    expect(bench).toContain("40");
  });
});
