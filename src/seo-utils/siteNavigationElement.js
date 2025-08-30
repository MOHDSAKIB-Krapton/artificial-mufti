export const siteNavigationElement = () => {
  return JSON.stringify({
    "@context": "http://schema.org",
    "@type": "siteNavigationElement",
    // For a single-page app, navigation elements typically link to sections on the same page.
    // We'll use anchor links here, which is the correct schema practice for this use case.
    name: [
      "Home",
      "Product",
      "Marketplace",
      "Pricing",
      "Terms and Conditions",
      "Coming Soon",
      "Contact",
    ],
    url: [
      // Assuming your site's domain is artificialmufti.vercel.app
      "https://artificial-mufti.vercel.app/",
      "https://artificial-mufti.vercel.app/product",
      "https://artificial-mufti.vercel.app/marketplace",
      "https://artificial-mufti.vercel.app/pricing",
      "https://artificial-mufti.vercel.app/terms",
      "https://artificial-mufti.vercel.app/coming-soon",
      "https://artificial-mufti.vercel.app/contact",
    ],
  });
};
