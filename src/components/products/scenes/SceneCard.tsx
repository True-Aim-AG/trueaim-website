import { SCENE_CARD, SCENE_CARD_HERO } from "@/components/content/surface";
import { cn } from "@/lib/utils";

/**
 * The rounded card the prototype draws its product screens in. A scene is
 * static markup read as one image: synthetic data, the site's tokens, no
 * browser chrome, the semantic colours only on bars and dots.
 */
export function SceneCard({
  alt,
  hero,
  className,
  children,
}: {
  alt: string;
  hero?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div role="img" aria-label={alt} className={cn(SCENE_CARD, hero && SCENE_CARD_HERO, className)}>
      {children}
    </div>
  );
}
