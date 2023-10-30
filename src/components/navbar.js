"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { SVGhambuger, SVGlogo } from "./atoms/svgs";
import ThemeToggle from "./atoms/themeToggle";
export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="bg-backg-surface dark:bg-backg-dark-surface">
      <div className="mx-auto items-center justify-center flex h-16 px-2 sm:px-6 lg:px-8 lg:max-w-screen-lg">
        <div className="flex flex-1 items-center justify-center">
          {/* collapsed menu items */}
          <div className="sm:hidden flex flex-row flex-1 justify-between items-center">
            <SVGlogo className="h-8 w-auto mx-8 py-2 text-backg-dark dark:text-backg hover:scale-110 hover:text-primary dark:hover:text-primary" />
            <SVGhambuger className="w-6 h-6 mx-8" />
          </div>
          {/* expanded menu items */}
          {!pathname.includes("/admin") && (
            <div className="hidden sm:flex sm:flex-row">
              <div className="space-x-4 md:space-x-8 flex mx-6">
                {[
                  { link: "cars" },
                  { link: "parts" },
                  {
                    logo: (
                      <SVGlogo className="transition h-8 w-auto mx-4 py-2 hover:scale-110 hover:text-primary dark:hover:text-primary" />
                    ),
                  },
                  { link: "service" },
                  { link: "contacts" },
                ].map((v, i) => (
                  <Link
                    key={i}
                    href={`/${v.link ? v.link : "/"}`}
                    className={`${
                      pathname === "/" + v.link
                        ? "text-primary"
                        : v.logo && pathname === "/"
                        ? "text-primary-dark"
                        : v.logo
                        ? "text-backg-dark dark:text-backg"
                        : ""
                    } flex justify-center items-center font-medium transition`}
                  >
                    {v.link ? capitalizeInit(v.link) : v.logo}
                  </Link>
                ))}
              </div>
              <div className="hover:text-primary m-2 p-2 absolute top-0 right-0 transition">
                <ThemeToggle />
              </div>
            </div>
          )}
          {/* admin menu items */}
          {pathname.includes("/admin") && (
            <div className="hidden sm:flex sm:flex-row">
              <div className="space-x-4 md:space-x-8 flex mx-6">
                <Link
                  href={"/admin/inventory"}
                  className={`${
                    pathname === "/admin/inventory" ? "text-primary" : ""
                  } flex justify-center items-center font-medium transition`}
                >
                  Inventory
                </Link>
                <Link
                  href={"/"}
                  className={`${
                    pathname === "/" ? "text-primary" : ""
                  } flex justify-center items-center font-medium transition`}
                >
                  <SVGlogo className="transition h-8 w-auto mx-4 py-2 hover:scale-110 hover:text-primary dark:hover:text-primary" />
                </Link>
                <Link
                  href={"/admin/inventory"}
                  className={`flex justify-center items-center font-medium transition`}
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  Logout
                </Link>
              </div>
              <div className="hover:text-primary m-2 p-2 absolute top-0 right-0 transition">
                <ThemeToggle />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
  function capitalizeInit(str) {
    const initChar = str.charAt(0).toUpperCase();
    return initChar + str.slice(1);
  }
}
