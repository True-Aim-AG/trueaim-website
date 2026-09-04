import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/brand/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <Logo variant="symbol-blue" height={48} className="mx-auto mb-8" />
        <h1 className="font-display text-4xl font-bold text-strong mb-4">404</h1>
        <p className="text-body mb-8">Page not found</p>
        <ButtonLink href="/" variant="primary" size="lg">
          Go home
        </ButtonLink>
      </div>
    </div>
  );
}
