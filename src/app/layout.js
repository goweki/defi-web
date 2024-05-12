import { Inter } from "next/font/google";
import "@/css/globals.css";
import Context from "./closed_routes/(home)/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXTAUTH_URL
  ),
  title: {
    template: "DEFI | %s",
    default: "DEFI Motors & Autoworks", // a default is required when creating a template
  },
  description: "Cars, parts and services that go beyond urban trails",
  keywords: [
    "Motors",
    "Autoworks",
    "offroad",
    "Nairobi",
    "Ford",
    "garage",
    "Kenya",
    "4X4",
    "cars",
    "service",
  ],
  robots: {
    // index: false,
    index: true,
    follow: true,
    nocache: true,
    // googleBot: {
    //   index: true,
    //   follow: true,
    //   noimageindex: true,
    //   'max-video-preview': -1,
    //   'max-image-preview': 'large',
    //   'max-snippet': -1,
    // },
  },
  // change with url of your image (recommended dimension = 1.91:1)
  // used in twitter, facebook, etc. card when link copied in tweet/status
  images: ["https://defioffroads.co.ke/brand/defi-card.jpg"],
  openGraph: {
    title: "DEFI Motors & Autoworks",
    description: "Cars, parts and services that go beyond urban trails",
    url: "https://defioffroads.co.ke",
    siteName: "DEFI Motors/Autoworks",
    images: ["https://defioffroads.co.ke/brand/defi-card.jpg"],
    // locale: 'en_US',
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Context>{children}</Context>
      </body>
    </html>
  );
}
