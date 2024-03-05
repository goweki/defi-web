"use client";
import { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { LibraryContext } from "../../layout";
import Loader from "@/components/loader";

export default function BlogsPage({ params }) {
  const library = useContext(LibraryContext);
  const [UIstate, setUIstate] = useState("loading");
  const [error, setError] = useState("");
  const [blogs, setBlogs] = useState("");
  // onMount - load blogposts
  useEffect(() => {
    if (library) {
      setBlogs(library.filter((v) => v.type === "blogpost"));
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
  if (blogs && params?.slug) {
    const selectedBlog = blogs.find(({ _id }) => _id === params.slug[0]);
    if (selectedBlog)
      return (
        <div className="w-full justify-between p-4 pt-4 mx-auto max-w-screen-lg transition">
          <article className="mx-auto w-full">
            <div className="my-6 flex flex-row no-wrap">
              <Link href="/library/blog" className="flex flex-row no-wrap">
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
                All blog-posts
              </Link>
            </div>
            {/* <figure className="relative my-8 h-[360px] md:h-[400px] lg:h-[440px] w-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/blogBanners/1.jpg"
                // width={500}
                // height={500}
                fill={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt="blog banner"
                className="object-cover"
                priority={true}
              />
              // <figcaption>Digital art by Anonymous</figcaption>
            </figure> */}
            <header className="mb-4 lg:mb-6">
              <h2 className="mb-4 text-3xl text-center font-extrabold leading-tight lg:mb-6 lg:text-4xl">
                {selectedBlog.title}
              </h2>
            </header>
            <div className="bg-backg-surface dark:bg-backg-dark-surface p-4 rounded-lg shadow whitespace-break-spaces">
              <p>{selectedBlog.content}</p>
              <p className="pt-4">
                <span className="text-sm italic">
                  by {selectedBlog.author},{" "}
                </span>
                <span className="text-xs italic"> on {selectedBlog.date}</span>
              </p>
            </div>
            {/* <address className="flex items-center mt-3 mb-6 not-italic">
              <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>

                <div>
                  <Link
                    href="#"
                    rel="author"
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    {selectedBlog.author}
                  </Link>
                  <p className="text-sm">
                    <time dateTime={selectedBlog.date}>
                      {selectedBlog.date}
                    </time>
                  </p>
                </div>
              </div>
            </address> */}
          </article>
        </div>
      );
  } else if (blogs && UIstate === "OK") {
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
          {blogs.length > 0 ? (
            <>
              <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold">
                  Lets discuss vehicles
                </h2>
                <p className="font-light sm:text-xl">
                  We enjoy talking about cars. Here are some thoughts and words
                  about the machines we love
                </p>
              </div>
              <div className="grid gap-8 lg:grid-cols-2">
                {blogs.map((v, i) => (
                  <article
                    key={v._id}
                    className="flex flex-col p-6 bg-backg-surface dark:bg-backg-dark-surface rounded-lg border border-font-inactive shadow"
                  >
                    <div className="flex justify-between items-center mb-5">
                      <span className="bg-primary-light dark:text-font text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded">
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
                        blog-post
                      </span>
                      <span className="text-sm">{v.date}</span>
                    </div>
                    <h2 className="mb-2 text-2xl font-bold tracking-tight">
                      <Link href={`/library/blog/${v._id}`}>{v.title}</Link>
                    </h2>
                    <p className="mb-5 flex flex-col flex-1">
                      {trancStr(v.content, 210)}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
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
                          {v.author}
                        </span>
                      </div>
                      <Link
                        href={`/library/blog/${v._id}`}
                        className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
                      >
                        Read more
                        <svg
                          className="ml-2 w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <p className="m-auto text-2xl">
              Unfortunately, we have no blog-posts for now. Please check in
              later
            </p>
          )}
        </div>
      </section>
    );
  } else return <Loader />;
}
