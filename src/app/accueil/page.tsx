import { HeroSection } from "@/features/page-accueil/HeroSection";
import { CategoriesSection } from "@/features/page-accueil/CategoriesSection";
import { PricingSection } from "@/features/page-accueil/PricingSection";
import { TestimonialsSection } from "@/features/page-accueil/TestimonialsSection";
import { FaqSection } from "@/features/page-accueil/FaqSection";
import { CtaSection } from "@/features/page-accueil/CtaSection";
import { FooterSection } from "@/features/page-accueil/FooterSection";

/**
 * Page d'accueil publique de Zuri (vitrine) — squelette : les sections
 * sont créées mais encore vides, à remplir une par une.
 */
export default function PageAccueil() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
      <FooterSection />
    </>
  );
}
