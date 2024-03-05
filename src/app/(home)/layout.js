import Link from "next/link";
import Navbar from "@/components/navbar";
import { SVGxlogo, SVGfblogo, SVGiglogo } from "@/components/atoms/svgs";
import Footer from "@/components/footer";

export default function HomeLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-1 w-full mb-12 items-center">
        {children}
      </main>
      <Footer />
    </>
  );
}
