export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // disallow: "/admin/",
      disallow: "",
    },
    sitemap: "https://defioffroads.co.ke/sitemap.xml",
  };
}
