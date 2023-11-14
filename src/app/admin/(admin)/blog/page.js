"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { trancStr } from "@/helpers/stringHandlers";
import { ButtonPrimary } from "@/components/atoms/buttons";

export default function BlogsPage({ params }) {
  const [UIstate, setUIstate] = useState("");
  const [error, setError] = useState("");
  const [blogs, setBlogs] = useState("");
  const [blogEdit, setBlogEdit] = useState({
    title: "",
    author: "",
    article: "",
  });
  useState;
  // onMount - fetch products
  useEffect(() => {
    const fetchOptions = { method: "GET" };
    fetch("/api/blogs", fetchOptions)
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
        {/* <!-- Side Section --> */}
        <aside className="w-full md:w-1/3 flex flex-col items-center px-3">
          <div className="p-5 mb-4 border border-font-inactive rounded-lg bg-backg-surface dark:bg-backg-dark-surface max-h-[1500px] overflow-y-auto">
            <ol className="mt-3 divide-y divider-font-inactive">
              {data.map((v, i) => (
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
        {/* <!-- Posts Section --> */}
        <section className="w-full md:w-2/3 flex flex-col items-center px-3">
          <form className="w-full bg-backg-surface dark:bg-backg-dark-surface rounded-lg shadow p-4 md:p-8">
            <input
              type="text"
              placeholder="Title..."
              className="border border-font-inactive focus:border-transparent focus:ring-primary bg-backg-raised dark:bg-backg-dark-raised w-full py-3 px-[14px] text-base outline-none placeholder:italic"
              value={blogEdit.title}
              onChange={(e) => {
                e.preventDefault();
                setBlogEdit({ ...blogEdit, title: e.target.value });
              }}
            />
            <input
              type="text"
              placeholder="Author..."
              className="border border-font-inactive focus:border-transparent focus:ring-primary bg-backg-raised dark:bg-backg-dark-raised w-full py-3 px-[14px] text-base outline-none placeholder:italic"
              value={blogEdit.author}
              onChange={(e) => {
                e.preventDefault();
                setBlogEdit({ ...blogEdit, author: e.target.value });
              }}
            />
            <div>
              <label htmlFor="editor" className="sr-only">
                Publish post
              </label>
              <textarea
                id="editor"
                rows="16"
                className="block w-full bg-transparent border border-font-inactive focus:border-transparent focus:ring-primary px-[7px] text-base outline-none placeholder:italic"
                placeholder="Write an article..."
                required
                value={blogEdit.article}
                onChange={(e) => {
                  e.preventDefault();
                  setBlogEdit({ ...blogEdit, article: e.target.value });
                }}
              ></textarea>
            </div>
            <ButtonPrimary label="Publish post" className="mt-4" />
          </form>
        </section>
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
