"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SVGmoon, SVGsun } from "./svgs";

export default function ThemeToggle({ className }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      {theme === "dark" ? (
        <button
          onClick={() => setTheme("light")}
          className={`rounded-full outline-none focus:outline-none focus-visible:ring focus-visible:ring-gray-100 focus:ring-opacity-20 ${className}`}
        >
          <span className="sr-only">Light Mode</span>
          <SVGsun className="w-6 h-6 text-font-faded dark:text-font-dark-faded hover:text-emerald-600 dark:hover:text-emerald-500" />
        </button>
      ) : (
        <button
          onClick={() => setTheme("dark")}
          className={`rounded-full outline-none focus:outline-none focus-visible:ring focus-visible:ring-gray-100 focus:ring-opacity-20 ${className}`}
        >
          <span className="sr-only">Dark Mode</span>
          <SVGmoon className="w-6 h-6 text-font-faded dark:text-font-dark-faded hover:text-emerald-600 dark:hover:text-emerald-500" />
        </button>
      )}
    </>
  );
}
