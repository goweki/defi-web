export const metadata = {
  robots: {
    index: true,
    follow: true,
  },
  // change with url of your image (recommended dimension = 1.91:1)
  // used in twitter, facebook, etc. card when link copied in tweet/status
  openGraph: {
    title: "DEFI | parts",
    description: "Parts & Accessories for 4x4 Cars",
    url: "https://defioffroads.co.ke",
    siteName: "DEFI Motors & Autoworks",
    images: ["https://defioffroads.co.ke/brand/defi-card.jpg"],
    // locale: 'en_US',
    type: "website",
  },
};

export default function PartsLayout({ children }) {
  return children;
}
