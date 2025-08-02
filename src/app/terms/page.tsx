import { HOST } from "@/constants";
import { comingSoonKeyword, termsAndConditionsKeyword } from "@/data/keywords";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { organizationSchema } from "@/seo-utils/organizationSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import TermsAndConditionsPage from "@/page-partials/terms/page";

const url = `${HOST}`;
const title = `Terms and Conditions - Artificial Mufti`;
const description = `Read the official Terms and Conditions for using the Artificial Mufti service. This page outlines the legal agreement, user responsibilities, and disclaimers for our AI-powered platform.`;
const keywords = termsAndConditionsKeyword;

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function Terms() {
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
      <TermsAndConditionsPage />
    </>
  );
}
