import Link from "next/link";
import Navbar from "@/components/navbar";
import { SVGxlogo, SVGfblogo, SVGiglogo } from "@/components/atoms/svgs";

export default function HomeLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-1 w-full mb-12 items-center">
        {children}
      </main>
      <footer className="bg-backg-surface dark:bg-backg-dark-surface w-full">
        <div className="mx-auto max-w-screen-lg p-4 py-6 lg:py-8">
          <hr className="my-6 border-font-inactive sm:mx-auto lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between mx-4">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023{" "}
              <a
                href="https://www.defioffroads.co.ke/"
                className="hover:underline"
              >
                DEFI Motors
              </a>
              . All Rights Reserved.
            </span>
            <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
              <Link
                href="https://m.facebook.com/people/Defimotors-Ke/100087672914932/"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <SVGfblogo className="w-4 h-4" />
                <span className="sr-only">facebook</span>
              </Link>
              <Link
                href="https://www.instagram.com/defimotors/"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <SVGiglogo className="w-4 h-4" />
                <span className="sr-only">instagram</span>
              </Link>
              <Link
                href="https://twitter.com/defi_motors"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <SVGxlogo className="w-4 h-4" />
                <span className="sr-only">X</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
