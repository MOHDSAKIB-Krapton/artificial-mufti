import { HOST } from "@/constants";
import { comingSoonKeyword } from "@/data/keywords";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { organizationSchema } from "@/seo-utils/organizationSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import ProfilePage from "@/page-partials/profile/page";

const url = `${HOST}`;
const title = `Profile | Artificial Mufti`;
const description = `Manage your account on Artificial Mufti, your intelligent companion for Islamic guidance. Update your personal details, review security settings, customize preferences, and control your data and notifications. Keep your profile secure and tailored while enjoying thoughtful, humorous, and well-referenced answers whenever you return.`;
const keywords = comingSoonKeyword;

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function Chat() {
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
      <ProfilePage />
    </>
  );
}
