"use client";
import React, { createContext, useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import toast, { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import Loader from "@/components/loader";
export const ProductsContext = createContext();

export default function Context({ children }) {
  const [products, setProducts] = useState(null);
  const [UIstate, setUIstate] = useState("loading");
  const [error, setError] = useState(null);
  // fetch products
  useEffect(() => {
    const fetchOptions = { method: "GET" };
    fetch("/api/products", fetchOptions)
      .then((res_) => res_.json())
      .then((json_) => {
        if (json_.success) {
          console.log(
            `SUCCESS: Documents fetched:${json_.success.length}\n.............`
          );
          setProducts(json_.success);
        } else if (json_.error) {
          console.error(
            "ERROR: could not fetch products\n > " +
              JSON.stringify(json_.error) +
              "\n.............."
          );
          setError(json_.error);
        } else {
          console.error(
            "ERROR: Loading products failed\n > " +
              JSON.stringify(json_) +
              "\n.............."
          );
          setError("ERROR: Check network and reload");
        }
      })
      .catch((err) => {
        setUIstate("failure");
        console.error("ERROR: caught error\n > " + err.error || err);
      });
  }, []);
  // onMount - 2.5sec delay
  useEffect(() => {
    setTimeout(() => {
      setUIstate("OK");
    }, 2500);
  }, []);
  //on Error
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <ProductsContext.Provider value={products}>
          {UIstate === "loading" ? (
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
