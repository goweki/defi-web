"use client";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
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
      <SessionProvider>
        {loading ? (
          <Loader />
        ) : (
          <React.StrictMode>
            {children}
            <Toaster />
          </React.StrictMode>
        )}
      </SessionProvider>
    </ThemeProvider>
  );
}
