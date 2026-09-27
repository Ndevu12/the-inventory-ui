import { LandingCta } from "../components/landing-cta";
import { LandingFooter } from "../components/landing-footer";
import { FEATURES_SECTION_LINKS, LandingNav } from "../components/landing-nav";
import { LandingFeatures } from "../components/landing-sections";
import { FeaturesComparison } from "../components/features-comparison";
import { FeaturesPricing } from "../components/features-pricing";

/** Public features page: the grid, a comparison, and pricing. */
export function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingNav links={FEATURES_SECTION_LINKS} />
      <main className="flex-1">
        <LandingFeatures />
        <FeaturesComparison />
        <FeaturesPricing />
        <LandingCta />
      </main>
      <LandingFooter />
    </div>
  );
}
