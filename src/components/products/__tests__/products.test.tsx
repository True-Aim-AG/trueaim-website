import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import {
  DecisionDossierSection,
  InvoiceLineItems,
  ModulesDiagram,
  OtusPrompts,
} from "@/components/products";

// next-intl's navigation cannot load under Vitest's Node resolver, so Link becomes a plain anchor.
vi.mock("@/i18n/navigation", async () => {
  const { createElement } = await import("react");
  return {
    Link: ({ href, children, ...rest }: { href: string; children?: React.ReactNode }) =>
      createElement("a", { href, ...rest }, children),
  };
});

describe("DecisionDossierSection", () => {
  it("renders the id, rows and export label", () => {
    const html = renderToStaticMarkup(
      <DecisionDossierSection
        id="dossier"
        heading="Decision Dossier"
        paragraphs={["Every decision is recorded."]}
        items={[{ title: "Clause", text: "Linked to the decision." }]}
        card={{
          title: "Claim 1042",
          subtitle: "Illustrative",
          status: "Approved",
          rows: [{ label: "Policy", value: "Travel" }],
          exportLabel: "Export as PDF",
        }}
      />,
    );
    expect(html).toContain('id="dossier"');
    expect(html).toContain("Policy");
    expect(html).toContain("Travel");
    expect(html).toContain("Export as PDF");
    expect(html).toContain("<dl");
  });
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

describe("InvoiceLineItems", () => {
  it("opens the first line item initially", () => {
    const html = renderToStaticMarkup(
      <InvoiceLineItems
        heading="Invoice"
        labels={{
          quantity: "Qty",
          amount: "Amount",
          deviation: "Deviation",
          saving: "Saving",
          status: { approved: "Approved", referred: "Referred", denied: "Denied" },
        }}
        items={[
          { description: "Line A", quantity: "1", amount: "100", status: "approved", deviation: "None", saving: "0", note: "Note A" },
          { description: "Line B", quantity: "2", amount: "200", status: "denied", deviation: "Rate", saving: "50", note: "Note B" },
        ]}
        total={{ label: "Total", value: "300" }}
      />,
    );
    expect(html.match(/aria-expanded="true"/g)).toHaveLength(1);
    expect(html.match(/aria-expanded="false"/g)).toHaveLength(1);
    expect(html).toContain("Note A");
    expect(html).not.toContain("Note B");
    expect(html).toContain("Total");
  });
});

describe("OtusPrompts", () => {
  it("selects the first tab and shows its panel", () => {
    const html = renderToStaticMarkup(
      <OtusPrompts
        label="Example prompts"
        youLabel="You"
        otusLabel="Otus"
        prompts={[
          { id: "a", tab: "Tab A", prompt: "Prompt A", answer: ["Answer A"] },
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
    expect(html).not.toContain("Prompt B");
  });
});
