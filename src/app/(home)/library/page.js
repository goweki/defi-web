"use client";
import Link from "next/link";
import { CardSimple } from "@/components/cards";
import carIllustration from "@/assets/images/illustration_vehicle_offfroad_1.svg";
import flagIllustration from "@/assets/images/bw_flag.svg";
import tireIllustration from "@/assets/images/bw_tire.svg";

export default function LibraryPage() {
  // return
  return (
    <section className="transition">
      <div className="py-8 px-4 mx-auto max-w-screen-lg lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold">
            blog, photos, events involving the machines we love.
          </h2>
          <p className="font-light sm:text-xl">
            Select a library item to view more items
          </p>
        </div>
        <div className="flex flex-wrap justify-center">
          <Link href="/library/blog">
            <CardSimple item={libraryCategories.blog} />
          </Link>
          <Link href="/library/events">
            <CardSimple item={libraryCategories.events} />
          </Link>
          <Link href="/library/album">
            <CardSimple item={libraryCategories.album} />
          </Link>
        </div>
      </div>
    </section>
  );
}

const libraryCategories = {
  blog: {
    name: "blog",
    image: tireIllustration,
    description: "Let us talk offroads!",
  },
  album: {
    name: "photos",
    image: carIllustration,
    description: "A visual tour of the machines we love",
  },
  events: {
    name: "events",
    image: flagIllustration,
    description: "See what we have coming up",
  },
};
