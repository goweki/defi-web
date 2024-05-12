"use client";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "@/components/loader";
export const LibraryContext = createContext();

export default function LibraryLayout({ children }) {
  const [library, setLibrary] = useState(null);
  const [UIstate, setUIstate] = useState("loading");
  const [error, setError] = useState(null);
  // onMount - fetch library items
  useEffect(() => {
    const fetchOptions = { method: "GET" };
    fetch("/api/library", fetchOptions)
      .then((res_) => res_.json())
      .then((json_) => {
        if (json_.success) {
          console.log(
            `SUCCESS: Library fetched:${json_.success.length}\n.............`
          );
          setLibrary(json_.success);
        } else if (json_.error) {
          console.error(
            "ERROR: could not fetch gallery\n > " +
              JSON.stringify(json_.error) +
              "\n.............."
          );
          setError(json_.error);
        } else {
          console.error(
            "ERROR: Loading gallery failed\n > " +
              JSON.stringify(json_) +
              "\n.............."
          );
          setError("ERROR: Check network and reload");
        }
      })
      .catch((err) => {
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
  if (UIstate === "OK") {
    return (
      <LibraryContext.Provider value={library}>
        {children}
      </LibraryContext.Provider>
    );
  } else return <Loader />;
}
