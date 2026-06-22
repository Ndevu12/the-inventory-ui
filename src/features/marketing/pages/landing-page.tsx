import { LandingNav } from "../components/landing-nav";
import { LandingHero } from "../components/landing-hero";
import {
  LandingFeatures,
  LandingHighlight,
  LandingMetrics,
  LandingTestimonial,
  LandingWorkflow,
} from "../components/landing-sections";
import { LandingFaq } from "../components/landing-faq";
import { LandingCta } from "../components/landing-cta";
import { LandingFooter } from "../components/landing-footer";

/**
 * Public marketing landing page served at `/`. Composed of server-rendered
 * sections; only the nav is interactive (auth-aware CTA + mobile menu).
 */
export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingNav />
      <main className="flex-1">
        <LandingHero />
        <LandingFeatures />
        <LandingWorkflow />
        <LandingHighlight />
        <LandingMetrics />
        <LandingTestimonial />
        <LandingFaq />
        <LandingCta />
      </main>
      <LandingFooter />
    </div>
  );
}
