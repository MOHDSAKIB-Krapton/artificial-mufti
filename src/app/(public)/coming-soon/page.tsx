import { HOST } from "@/constants";
import { comingSoonKeyword } from "@/data/keywords";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { organizationSchema } from "@/seo-utils/organizationSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import ComingSoonPage from "@/page-partials/coming-soon-page";

const url = `${HOST}`;
const title = `Artificial Mufti: The Future of Islamic Guidance (Coming Soon)`;
const description = `The Artificial Mufti is launching soon! Our AI-powered assistant will provide thoughtful, humorous, and well-referenced guidance on Islamic topics. Stay tuned to be the first to experience the future of digital Islamic learning.`;
const keywords = comingSoonKeyword;

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function ComingSoon() {
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
      <ComingSoonPage />
    </>
  );
}
