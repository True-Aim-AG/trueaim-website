import { notFound } from "next/navigation";

/**
 * Catch-all for unmatched paths under a locale prefix. Calling notFound() here renders the
 * locale-scoped not-found page inside the locale layout, so the 404 keeps the right <html lang>.
 */
export default function CatchAllPage() {
  notFound();
}
