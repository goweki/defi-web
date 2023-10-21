"use client";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { useTheme } from "next-themes";
import Loader from "@/components/loader";

export default function Context({ children }) {
  const [loading, setLoading] = useState(true);
  // onMount - delay
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {loading ? (
        <Loader />
      ) : (
        <React.StrictMode>
          {children}
          <Toaster />
        </React.StrictMode>
      )}
    </ThemeProvider>
  );
}
