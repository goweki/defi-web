"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import Loader from "@/components/loader";
import { CardSimple } from "@/components/cards";
import offroadIllustration1 from "@/assets/images/illustration_vehicle_offfroad_1.svg";
import offroadIllustration2 from "@/assets/images/illustration_vehicle_offfroad_2.svg";

export default function LibraryPage({ params }) {
  const [error, setError] = useState("");
  const [gallery, setGallery] = useState("");
  const [galleryCategories, setGalleryCategories] = useState("");
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
          setGallery(json_.success);
          const categorySet = new Set(json_.success.map((v, i) => v.type));
          setGalleryCategories(Array.from(categorySet));
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
  // onError
  useEffect(() => {
    if (error) {
      toast.error(error);
      setError("");
    }
  }, [error]);
  // return
  if (galleryCategories) {
    return (
      <section className="transition">
        <div className="py-8 px-4 mx-auto max-w-screen-lg lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold">
              Check out our blog, photos, events involving the machines we love.
            </h2>
            <p className="font-light sm:text-xl">
              Select a library item to view more items
            </p>
          </div>
          <div className="flex flex-wrap justify-center">
            <Link href="/library/blog">
              <CardSimple item={libraryCategories.blog} />
            </Link>
            <Link href="/library/album">
              <CardSimple item={libraryCategories.album} />
            </Link>
            <Link href="/library/events">
              <CardSimple item={libraryCategories.events} />
            </Link>
          </div>
        </div>
      </section>
    );
  } else return <Loader />;
}

const libraryCategories = {
  blog: {
    name: "blog",
    image: offroadIllustration1,
    description: "Let us talk offroads!",
  },
  album: {
    name: "images",
    image: offroadIllustration2,
    description: "A visual tour of the machines we love",
  },
  events: {
    name: "events",
    image: offroadIllustration2,
    description: "See what we have coming up",
  },
};
