"use client";
import { useRouter } from "next/navigation";
import { SVGfblogo, SVGiglogo, SVGlogo, SVGxlogo } from "./atoms/svgs";
import Link from "next/link";
import { CardInFooter } from "./cards";
export default function Footer() {
  const router = useRouter();
  return (
    <footer className="bg-backg-surface dark:bg-backg-dark-surface w-full">
      <div className="mx-auto max-w-screen-lg p-4 py-6 lg:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Card 1 */}
          {/* <div className="max-w-md flex flex-col items-start justify-start bg-gradientCard rounded-lg p-6 m-3">
            <h4 className="mb-2 font-bold uppercase">Looking for a CAR?</h4>
            <div className="flex flex-wrap sm:flex-nowrap">
              <div className="max-h-20 m-2 overflow-hidden">
                Check out our assortment of vehicles...
              </div>
              <ButtonSecondary label="View Cars" className="ml-auto" />
            </div>
          </div> */}
          <CardInFooter
            title="Looking for a CAR?"
            desc="Check out our assortment of vehicles..."
            btnText="View Cars"
            onClick={() => router.push("/cars")}
          />
          {/* Card 2 */}
          <CardInFooter
            title="Due for Car service?"
            desc="We love taking care of vehicles..."
            btnText="View Services"
            onClick={() => router.push("/services")}
          />
        </div>
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
          <div className="flex mt-4 space-x-5 sm:mt-0 sm:mr-2">
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
            {/* <Link
              href="https://twitter.com/defi_motors"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <SVGxlogo className="w-4 h-4" />
              <span className="sr-only">X</span>
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
