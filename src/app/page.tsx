import HomePage from "@/page-partials/homepage";
import { HOST } from "@/constants";
import { homeKeyword } from "@/data/keywords";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { organizationSchema } from "@/seo-utils/organizationSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import Layout from "@/components/layout/page";

const url = `${HOST}`;
const title = `Artificial Mufti: Your AI Companion for Islamic Guidance`;
const description = `The Artificial Mufti is an AI-powered assistant providing thoughtful, humorous, and well-referenced guidance on Islamic topics. Blending traditional wisdom with modern technology, we make learning accessible and engaging.`;
const keywords = homeKeyword;

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function Home() {
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
      <Layout>
        <HomePage />
      </Layout>
    </>
  );
}
