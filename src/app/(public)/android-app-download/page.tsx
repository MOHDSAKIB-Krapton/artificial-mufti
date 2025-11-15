import { HOST } from "@/constants";
import { androidAppDownloadKeyword, comingSoonKeyword } from "@/data/keywords";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { organizationSchema } from "@/seo-utils/organizationSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import AndroidAppDownload from "@/components/page-partials/android-app-download/page";

const url = `${HOST}/android-app-download`;
const title = `Download Artificial Mufti - Islamic AI Assistant (Android APK)`;
const description = `Download the official Artificial Mufti APK. A privacy-first Islamic AI assistant that provides sourced answers, prayer times, Qibla direction, and offline guidance. Safe, lightweight, and completely free.`;
const keywords = androidAppDownloadKeyword;

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

const GITHUB_API =
  "https://api.github.com/repos/MOHDSAKIB-Krapton/artificialmufti/releases";

async function getLatestRelease() {
  const res = await fetch(GITHUB_API, { cache: "no-store" });
  const releases = await res.json();

  const latest = releases[0];
  const apk = latest.assets.find(
    (a: any) => a.content_type === "application/vnd.android.package-archive"
  );

  return {
    version: latest.tag_name,
    prerelease: latest.prerelease,
    title: latest.name,
    notes: latest.body,
    updated: latest.published_at,
    sizeMB: (apk.size / 1024 / 1024).toFixed(2) + " MB",
    downloadUrl: apk.browser_download_url,
    downloadCount: apk.download_count,
  };
}

export default async function ComingSoon() {
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
      <AndroidAppDownload release={release} />
    </>
  );
}
