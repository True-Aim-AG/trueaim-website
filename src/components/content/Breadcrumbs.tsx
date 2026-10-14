import type { BreadcrumbItem } from "./schema";

/**
 * Visible breadcrumb trail for every page below home. Plain <a href> links
 * in an ordered list; the last item is the current page. Feed the same
 * items to breadcrumbListSchema() so BreadcrumbList matches what is shown.
 * `label` names the landmark for screen readers and comes from messages.
 */
export function Breadcrumbs({
  items,
  label,
}: {
  items: BreadcrumbItem[];
  label: string;
}) {
  return (
    <nav aria-label={label} className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return (
            <li key={item.url} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {current ? (
                <span aria-current="page" className="text-strong">
                  {item.name}
                </span>
              ) : (
                <a href={new URL(item.url).pathname} className="text-link hover:underline">
                  {item.name}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
