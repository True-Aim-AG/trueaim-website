/**
 * Comparisons and step lists as a real HTML table, never an image. The
 * caption names the table for screen readers and AI engines; the first
 * column holds row headers. Hairline rules per the design system.
 */
export type ComparisonRow = {
  label: string;
  cells: React.ReactNode[];
};

export function ComparisonTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  /** Header labels, the first one heading the row-label column. */
  columns: string[];
  rows: ComparisonRow[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <caption className="mb-3 text-left text-caption-sm text-subtle">
          {caption}
        </caption>
        <thead>
          <tr className="border-b border-hairline">
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="py-3 pr-4 text-left align-top font-display font-medium text-strong"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-hairline">
              <th
                scope="row"
                className="py-3 pr-4 text-left align-top font-display font-medium text-strong"
              >
                {row.label}
              </th>
              {row.cells.map((cell, index) => (
                <td key={index} className="py-3 pr-4 align-top text-body leading-[1.6]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
