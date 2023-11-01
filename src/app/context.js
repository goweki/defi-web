"use client";
import React, { createContext, useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import Loader from "@/components/loader";
export const ProductsContext = createContext();

export default function Context({ children }) {
  const [products, setProducts] = useState("");
  const [loading, setLoading] = useState(true);
  // fetch products
  useEffect(() => {
    const fetchOptions = { method: "GET" };
    // GET request using fetch
    fetch("/api/products", fetchOptions)
      .then((res_) => res_.json())
      .then((json_) => {
        if (json_.success) {
          console.log("SUCCESS: Documents fetched\n.............");
          setProducts(json_.success);
        } else if (json_.error) {
          console.error(
            "ERROR: fetching all products\n > " +
              JSON.stringify(json_.error) +
              "\n.............."
          );
          //setError(json_.error);
        } else {
          console.error(
            "ERROR: Loading product failed\n > " +
              JSON.stringify(json_) +
              "\n.............."
          );
          //setError("Unknown Error");
        }
      })
      .catch((err) => {
        setError(err.error || err);
        console.error("ERROR: caught error\n > " + err.error || err);
      });
  }, []);
  // onMount - delay
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <ProductsContext.Provider value={products}>
          {loading || !products ? (
            <Loader />
          ) : (
            <React.StrictMode>
              {children}
              <Toaster />
            </React.StrictMode>
          )}
        </ProductsContext.Provider>
      </SessionProvider>
    </ThemeProvider>
  );
}
