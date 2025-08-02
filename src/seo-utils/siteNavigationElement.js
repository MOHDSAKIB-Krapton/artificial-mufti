export const siteNavigationElement = () => {
  return JSON.stringify({
    "@context": "http://schema.org",
    "@type": "siteNavigationElement",
    // For a single-page app, navigation elements typically link to sections on the same page.
    // We'll use anchor links here, which is the correct schema practice for this use case.
    name: ["Home", "How It Works", "Core Features", "Example Q&A", "FAQ"],
    url: [
      // Assuming your site's domain is artificialmufti.vercel.app
      "https://artificial-mufti.vercel.app/",
      "https://artificial-mufti.vercel.app/#how-it-works",
      "https://artificial-mufti.vercel.app/#features",
      "https://artificial-mufti.vercel.app/#examples",
      "https://artificial-mufti.vercel.app/#faq",
    ],
  });
};
