import { Inter } from "next/font/google";
import "@/css/globals.css";
import Context from "./context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DEFI",
  description: "DEFI Motors and Auto-works",
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
