import { HOST } from "@/constants";
import { contactKeyword } from "@/data/keywords";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { organizationSchema } from "@/seo-utils/organizationSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import ContactPage from "@/page-partials/contact/page";

const url = `${HOST}`;
const title = `Contact Us - Artificial Mufti`;
const description = `Have a question, feedback, or a partnership idea? Get in touch with the team behind the Artificial Mufti. We're here to listen and help you on your journey.`;
const keywords = contactKeyword;

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function Contact() {
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
      <ContactPage />
    </>
  );
}
