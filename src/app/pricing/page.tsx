import { HOST } from "@/constants";
import { pricingKeyword } from "@/data/keywords";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { organizationSchema } from "@/seo-utils/organizationSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import PricingPage from "@/page-partials/pricing/page";

const url = `${HOST}`;
const title = `Pricing Plans - Artificial Mufti`;
const description = `Find the perfect plan for your journey with the Artificial Mufti. Explore our subscription options, from free access to premium tiers, designed to meet your specific needs for Islamic guidance.`;
const keywords = pricingKeyword;

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function Pricing() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: webPageSchema(title, description, url),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: organizationSchema() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: siteNavigationElement() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadCrumbSchema(title, HOST, url) }}
      />
      <PricingPage />
    </>
  );
}
