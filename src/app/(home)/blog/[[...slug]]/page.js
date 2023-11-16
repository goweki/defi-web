"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { trancStr } from "@/helpers/stringHandlers";

export default function BlogsPage({ params }) {
  const [UIstate, setUIstate] = useState("");
  const [error, setError] = useState("");
  const [blogs, setBlogs] = useState("");
  useState;
  // onMount - fetch products
  useEffect(() => {
    const fetchOptions = { method: "GET" };
    fetch("/api/blog", fetchOptions)
      .then((res_) => res_.json())
      .then((json_) => {
        if (json_.success) {
          console.log(
            `SUCCESS: Documents fetched:${json_.success.length}\n.............`
          );
          setBlogs(json_.success);
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
        setUIstate("OK");
      })
      .catch((err) => {
        setUIstate("failed");
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
  if (UIstate === "OK")
    return (
      <div className="container mx-auto flex flex-wrap py-6">
        {/* <!-- Posts Section --> */}
        <section className="w-full md:w-2/3 flex flex-col items-center px-3">
          {blogs &&
            blogs.map((v, i) => (
              <article
                key={v._id}
                className="group hover:shadow-lg cursor-pointer flex flex-col shadow my-4 bg-backg-surface dark:bg-backg-dark-surface rounded-lg overflow-hidden"
              >
                {/* <!-- card IMAGE --> */}
                <div className="aspect-[2/1] overflow-hidden">
                  <Image
                    src="/stock_image.jpg"
                    width={1000}
                    height={500}
                    alt="article image"
                    className="group-hover:scale-110 transition"
                  />
                </div>
                {/* Card  */}
                <div className="flex flex-col justify-start p-6">
                  <p className="group-hover:text-primary-dark text-3xl font-bold pb-4">
                    {v.title}
                  </p>
                  <p className="text-sm pb-3">
                    By <span className="font-semibold">{v.author}</span>,
                    Published on {v.date}
                  </p>
                  <p href="#" className="pb-6">
                    {trancStr(v.article, 210)}
                  </p>
                  <p className="group-hover:text-primary-dark uppercase no-wrap">
                    Continue Reading
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4 inline-block mx-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </p>
                </div>
              </article>
            ))}

          {/* <!-- Pagination --> */}
          {data.length > 3 && (
            <div className="flex items-center py-8">
              <a
                href="#"
                className="h-10 w-10 bg-blue-800 hover:bg-blue-600 font-semibold text-white text-sm flex items-center justify-center"
              >
                1
              </a>
              <a
                href="#"
                className="h-10 w-10 font-semibold text-gray-800 hover:bg-blue-600 hover:text-white text-sm flex items-center justify-center"
              >
                2
              </a>
              <a
                href="#"
                className="h-10 w-10 font-semibold text-gray-800 hover:text-gray-900 text-sm flex items-center justify-center ml-3"
              >
                Next{" "}
                <svg
                  className="svg-inline--fa fa-arrow-right fa-w-14 ml-2"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-right"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"
                  ></path>
                </svg>
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          )}
        </section>

        {/* <!-- Sidebar Section --> */}
        <aside className="hidden md:w-1/3 md:flex flex-col items-center px-3">
          <div className="p-5 mb-4 border border-font-inactive rounded-lg bg-backg-surface dark:bg-backg-dark-surface max-h-[1500px] overflow-y-auto">
            <ol className="mt-3 divide-y divider-font-inactive">
              {blogs &&
                blogs.map((v, i) => (
                  <li key={v._id}>
                    <Link
                      href="#"
                      className="flex flex-col p-3 sm:flex hover:bg-backg dark:hover:bg-backg-dark hover:text-primary-dark"
                    >
                      <div className="text-base font-normal">
                        <p className="font-bold lg:text-lg">{v.title}</p>
                      </div>
                      <div className="text-sm font-normal">
                        By:{" " + v.author}
                      </div>
                      <span className="inline-flex items-center text-xs font-normal my-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-4 h-4 mx-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {v.date}
                      </span>
                    </Link>
                  </li>
                ))}
            </ol>
          </div>
        </aside>
      </div>
    );
}

const data = [
  {
    _id: "blog001",
    title: "What to look for in a first Car",
    author: "Mama Mboga",
    date: "12/11/2013",
    category: ["Technology", "automotive"],
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    _id: "blog002",
    title: "What to look for in a second Car",
    author: "Mama Skuma",
    category: ["Technology", "automotive"],
    date: "11/11/2013",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];
