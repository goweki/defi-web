"use client";
import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { LibraryContext } from "../layout";
import Loader from "@/components/loader";

export default function EventsPage() {
  const library = useContext(LibraryContext);
  const [UIstate, setUIstate] = useState("loading");
  const [error, setError] = useState("");
  const [photos, setPhotos] = useState("");
  // onMount - load blogposts
  useEffect(() => {
    if (library) {
      setPhotos(library.filter((v) => v.type === "photo"));
    }
    setUIstate("OK");
  }, [library]);
  // onError
  useEffect(() => {
    if (error) {
      toast.error(error);
      setError("");
    }
  }, [error]);
  // return
  if (UIstate === "OK" && photos) {
    return (
      <section className="transition">
        <div className="py-8 px-4 mx-auto max-w-screen-lg lg:py-16 lg:px-6">
          <div className="my-6 flex flex-row no-wrap">
            <Link href="/library" className="flex flex-row no-wrap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 mx-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                />
              </svg>
              Back to Library menu
            </Link>
          </div>
          {photos.length > 0 ? (
            <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
              <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold">
                A visual journey
              </h2>
              <p className="font-light sm:text-xl">
                Cars go hand in hand with stunning views and beautiful shots...
              </p>
            </div>
          ) : (
            <p className="m-auto text-2xl">
              Unfortunately, we have no images for now
            </p>
          )}
          <div className="grid gap-8 lg:grid-cols-2">
            {photos.map((v, i) => (
              <article
                key={v._id}
                className="flex flex-col p-6 bg-backg-surface dark:bg-backg-dark-surface rounded-lg border border-font-inactive shadow"
              >
                <div className="flex justify-between items-center mb-5">
                  <span className="bg-primary-dark text-font-dark-focus text-base font-sm inline-flex items-center px-2 py-1 rounded">
                    {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg> */}
                    photo
                  </span>
                </div>
                <Image
                  className="rounded"
                  src={v.image}
                  width={500}
                  height={500}
                  alt="image"
                />

                <p className="mt-2 mb-4 flex flex-col flex-1 text-center">
                  {v.description}
                </p>

                {/* <div className="flex m-auto space-x-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>

                    <span className="font-medium dark:text-white">
                      Event by {v.author}
                    </span>
                  </div> */}
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  } else return <Loader />;
}
