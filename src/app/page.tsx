import { HeroSection } from "@/features/page-accueil/HeroSection";
import { CategoriesSection } from "@/features/page-accueil/CategoriesSection";
import { PricingSection } from "@/features/page-accueil/PricingSection";
import { ProSection } from "@/features/page-accueil/ProSection";
import { TestimonialsSection } from "@/features/page-accueil/TestimonialsSection";
import { FaqSection } from "@/features/page-accueil/FaqSection";
import { CtaSection } from "@/features/page-accueil/CtaSection";
import { FooterSection } from "@/features/page-accueil/FooterSection";

/**
 * Page d'accueil publique de Zuri (vitrine) — squelette : les sections
 * sont créées mais encore vides, à remplir une par une.
 * Fond blanc imposé : la vitrine ne suit pas le mode nuit du back-office
 * (sinon le fond `body` devient noir quand le thème sombre est mémorisé).
 */
export default function PageAccueil() {
  return (
    <div className="min-h-dvh bg-white">
      <HeroSection />
      <CategoriesSection />
      <PricingSection />
      <ProSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
      <FooterSection />
    </div>
  );
}
