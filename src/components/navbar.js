import Link from "next/link";
import { SVGhambuger, SVGlogo } from "./atoms/svgs";
import ThemeToggle from "./atoms/themeToggle";
export default function Navbar() {
  return (
    <nav className="bg-backg-surface dark:bg-backg-dark-surface">
      <div className="mx-auto items-center justify-center flex h-16 px-2 sm:px-6 lg:px-8 lg:max-w-screen-lg">
        <div className="flex flex-1 items-center justify-center">
          {/* minimized menu items */}
          <div className="sm:hidden flex flex-row flex-1 justify-between items-center">
            <SVGlogo className="h-8 w-auto mx-8 py-2 text-backg-dark dark:text-backg hover:scale-110 hover:text-primary dark:hover:text-primary" />
            <SVGhambuger className="w-6 h-6 mx-8" />
          </div>
          {/* sm-plus menu items */}
          <div className="hidden sm:flex sm:flex-row">
            <div className="space-x-4 flex mx-6">
              {[
                { link: "home" },
                { link: "about" },
                {
                  logo: (
                    <SVGlogo className="h-8 w-auto mx-8 py-2 text-backg-dark dark:text-backg hover:scale-110 hover:text-primary dark:hover:text-primary" />
                  ),
                },
                { link: "motors" },
                { link: "auto-works" },
              ].map((v, i) => (
                <Link
                  key={i}
                  // href="HI"
                  href={`/${v.link ? v.link : "home"}`}
                  className="flex mx-4 justify-center items-center font-medium"
                >
                  {v.link ? capitalizeInit(v.link) : v.logo}
                </Link>
              ))}
            </div>
            <div className="hover:text-primary m-2 p-2 absolute top-0 right-0">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
  function capitalizeInit(str) {
    const initChar = str.charAt(0).toUpperCase();
    return initChar + str.slice(1);
  }
}
