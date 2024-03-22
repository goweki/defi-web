"use client";
import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { SVGhambuger, SVGlogo } from "./atoms/svgs";
import ThemeToggle, { ThemeToggleText } from "./atoms/themeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [hamIsOpen, setHamIsOpen] = useState(false);
  return (
    <nav className="bg-backg-surface dark:bg-backg-dark-surface">
      <div className="mx-auto items-center justify-between flex h-16 px-2 sm:px-6 lg:px-8 lg:max-w-screen-xl">
        {/* LOGO */}
        <Link href="/">
          <SVGlogo className="transition h-8 w-auto mx-4 py-2 hover:scale-110 hover:text-primary dark:hover:text-primary" />
        </Link>
        {/* collapsed menu items: HAMBURGER */}
        <div className="md:hidden flex flex-row justify-between items-center">
          <button
            onClick={() => setHamIsOpen(true)}
            className="flex p-3 hover:text-primary"
          >
            <SVGhambuger className="w-6 h-6" />
          </button>
          {hamIsOpen && (
            <div className="bg-backg/90 dark:bg-backg-dark/90 shadow fixed top-0 left-0 z-30 w-full h-full transition p-8 ">
              <div className="w-fit m-auto p-8 bg-backg-raised dark:bg-backg-dark-raised rounded-lg [&>li]:pl-4 [&>li]:pr-8 [&>li>a]:text-center [&>li>a]:relative [&>li>a]:transition [&>li>a]:duration-200 [&>li>a]:ease-in-out [&>li>a]:font-medium [&>li>a]:text-lg">
                <div className="flex flex-row justify-end">
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      setHamIsOpen(false);
                    }}
                    className="font-bold mb-4"
                    href="#"
                  >
                    X
                  </Link>
                </div>
                <li>
                  <Link href="/cars" onClick={(e) => setHamIsOpen(false)}>
                    Cars
                  </Link>
                </li>
                <li>
                  <Link href="/parts" onClick={(e) => setHamIsOpen(false)}>
                    Parts
                  </Link>
                </li>
                <li>
                  <Link
                    href="/accessories"
                    onClick={(e) => setHamIsOpen(false)}
                  >
                    Accessories
                  </Link>
                </li>
                <li>
                  <Link href="/services" onClick={(e) => setHamIsOpen(false)}>
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/library" onClick={(e) => setHamIsOpen(false)}>
                    Library
                  </Link>
                </li>
                <li>
                  <Link href="/contacts" onClick={(e) => setHamIsOpen(false)}>
                    Contacts
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.stopPropagation();
                      setHamIsOpen(false);
                    }}
                  >
                    <ThemeToggleText />
                  </Link>
                </li>
              </div>
            </div>
          )}
        </div>
        {/* all menu items */}
        {!pathname.includes("/admin") && (
          <div className="hidden md:flex md:flex-row">
            <div className="space-x-3 md:space-x-6 flex ml-2 mr-6">
              {[
                { link: "cars" },
                { link: "parts" },
                { link: "accessories" },
                { link: "services" },
                // { link: "blog" },
                { link: "library" },
                { link: "contacts" },
              ].map((v, i) => (
                <Link
                  key={i}
                  href={`/${v.link}`}
                  className={`${
                    pathname.includes("/" + v.link) ? "text-primary" : ""
                  } flex justify-center items-center font-semibold transition`}
                >
                  {v.link ? capitalizeInit(v.link) : v.logo}
                </Link>
              ))}
            </div>
          </div>
        )}
        {/* admin menu items */}
        {pathname.includes("/admin") && (
          <div className="hidden md:flex md:flex-row">
            <div className="space-x-4 md:space-x-8 flex mx-6">
              <Link
                href={"/admin/products"}
                className={`${
                  pathname === "/admin/products" ? "text-primary" : ""
                } flex justify-center items-center font-medium transition`}
              >
                Products
              </Link>
              {/* <Link
                  href={"/"}
                  className={`${
                    pathname === "/" ? "text-primary" : ""
                  } flex justify-center items-center font-medium transition`}
                >
                  <SVGlogo className="transition h-8 w-auto mx-4 py-2 hover:scale-110 hover:text-primary dark:hover:text-primary" />
                </Link> */}
              <Link
                href={"/admin/library"}
                className={`${
                  pathname === "/admin/library" ? "text-primary" : ""
                } flex justify-center items-center font-medium transition`}
              >
                Library
              </Link>
              <Link
                href={"/"}
                className={`flex justify-center items-center font-medium transition`}
              >
                Website
              </Link>
              <Link
                href={"/admin"}
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
        <div className="hidden md:block mr-2">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
  function capitalizeInit(str) {
    const initChar = str.charAt(0).toUpperCase();
    return initChar + str.slice(1);
  }
}
