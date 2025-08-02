import { HOST } from "../constants";

export const createMetaData = ({
  url = `${HOST}`,
  title = `Artificial Mufti - Your AI Companion for Islamic Guidance`,
  description = `The Artificial Mufti is an AI-powered assistant providing thoughtful, humorous, and well-referenced guidance on Islamic topics. Blending traditional wisdom with modern technology, we make learning accessible and engaging.`,
  keywords = `Artificial Mufti, AI Mufti, Islamic guidance, ask a mufti, Islam, Muslim, Q&A, Quran, Hadith, Islamic AI, digital mufti, fatwa, Islamic knowledge`,
  image = "https://www.artificial-mufti.vercel.app/assets/custom_icons/logo-full.png",
} = {}) => {
  return {
    metadataBase: new URL("https://www.artificial-mufti.vercel.app"),
    title,
    description,
    keywords,
    url,
    openGraph: {
      type: "website",
      url: url,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      site: "https://www.artificial-mufti.vercel.app",
      title,
      description,
      images: [image],
    },
    icons: {
      other: [
        { rel: "canonical", url: url },
        {
          rel: "image_src",
          url: image,
        },
      ],
    },
  };
};
