export const organizationSchema = () => {
  return JSON.stringify({
    "@context": "http://schema.org",
    "@type": "Organization",
    name: "Artificial Mufti",
    url: "https://www.artificial-mufti.vercel.app/",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-8800132527", // MOHD SAKIB
        contactType: "Customer support",
      },
      {
        "@type": "ContactPoint",
        telephone: "+91-7376162570", // UMAR
        contactType: "Customer support",
      },
    ],
    logo: "https://www.artificial-mufti.vercel.app/assets/custom_icons/logo-full.webp",
    sameAs: [
      "https://www.facebook.com/artificialmufti",
      "https://twitter.com/artificialmufti",
      "https://www.linkedin.com/company/artificialmufti",
      "https://www.instagram.com/artificialmufti/",
      "https://www.youtube.com/@artificialmufti",
    ],
  });
};
