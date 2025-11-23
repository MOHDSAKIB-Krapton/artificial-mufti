import { HOST } from "@/constants";
import { androidAppDownloadKeyword, comingSoonKeyword } from "@/data/keywords";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { organizationSchema } from "@/seo-utils/organizationSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import AppDownload from "@/components/page-partials/app-download/page";

const url = `${HOST}/app-download`;
const title = `Download Artificial Mufti - Islamic AI Assistant (Android APK)`;
const description = `Download the official Artificial Mufti APK. A privacy-first Islamic AI assistant that provides sourced answers, prayer times, Qibla direction, and offline guidance. Safe, lightweight, and completely free.`;
const keywords = androidAppDownloadKeyword;

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

const GITHUB_API =
  "https://github.com/MOHDSAKIB-Krapton/artificialmufti/releases/latest/download/metadata.json";

async function getLatestRelease() {
  const res = await fetch(GITHUB_API, { cache: "no-store" });

  if (!res.ok) {
    console.error("Failed to load metadata.json", await res.text());
    return null;
  }

  const meta = await res.json();

  return {
    version: meta.versionName,               // ex: "v1.0.0+3"
    versionCode: meta.versionCode,           // ex: 3
    title: `Artificial Mufti v${meta.versionName}`,               // optional future feature
    updated: meta.publishedAt,
    downloadUrl: meta.apkUrl,
  };
}


export default async function AppDownloadPage() {
  const release = await getLatestRelease();
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
      <AppDownload release={release} />
    </>
  );
}
