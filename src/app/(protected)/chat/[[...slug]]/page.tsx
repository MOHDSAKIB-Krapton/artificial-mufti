import { HOST } from "@/constants";
import { comingSoonKeyword } from "@/data/keywords";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { organizationSchema } from "@/seo-utils/organizationSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import ConversationPage from "@/page-partials/chat/conversation/page";

const url = `${HOST}`;
const title = `Conversation | Artificial Mufti`;
const description = `Welcome to Artificial Mufti, your intelligent chat companion for Islamic guidance. Explore past conversations, ask new questions, and receive thoughtful, humorous, and well-referenced answers. Whether you're revisiting your chat history or starting fresh, the future of digital Islamic learning is here.`;
const keywords = comingSoonKeyword;

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default async function Conversation({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const chatId = slug ? (slug.length > 0 ? slug[0] : null) : null;

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
      <ConversationPage initialChatId={chatId} />
    </>
  );
}
