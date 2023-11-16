"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ButtonPrimary, ButtonSecondary } from "@/components/atoms/buttons";

export default function BlogsPage() {
  const [UIstate, setUIstate] = useState("");
  const [error, setError] = useState("");
  const [blogs, setBlogs] = useState("");
  const [selectedBlog, setSelectedBlog] = useState("");
  const [blogEdit, setBlogEdit] = useState({
    title: "",
    author: "",
    article: "",
  });
  // onMount,blogs - fetch blogposts
  useEffect(() => {
    if (!blogs) {
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
    }
  }, [blogs]);
  // onError
  useEffect(() => {
    if (error) {
      toast.error(error);
      setError("");
    }
  }, [error]);
  // onBlogSelect/Deselect
  useEffect(() => {
    if (selectedBlog) {
      setBlogEdit({
        title: selectedBlog.title,
        author: selectedBlog.author,
        article: selectedBlog.article,
      });
    } else {
      setBlogEdit({
        title: "",
        author: "",
        article: "",
      });
    }
  }, [selectedBlog]);
  // onSubmit
  async function handleSave(e) {
    e.stopPropagation();
    e.preventDefault();
    // setLoading(true);
    // confirm fields filled
    if (!blogEdit.title || !blogEdit.author || !blogEdit.article) {
      toast.error(`Fill empty fields`);
      return;
    }
    // fetch options
    let fetchOptions = "";
    if (!selectedBlog) {
      fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          docType: "blogpost",
          title: blogEdit.title,
          author: blogEdit.author,
          article: blogEdit.article,
        }),
      };
    } else {
      fetchOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          docType: "blogpost",
          _id: selectedBlog._id,
          title: blogEdit.title,
          author: blogEdit.author,
          article: blogEdit.article,
        }),
      };
    }
    // make CALL using fetch
    fetch("/api/admin", fetchOptions)
      .then((res_) => res_.json())
      .then((json_) => {
        if (json_.success) {
          console.log(
            "SUCCESS: Document updated\n > " +
              JSON.stringify(json_) +
              "\n.............."
          );
          toast.success("Blog saved!");
          setBlogEdit({
            title: "",
            author: "",
            article: "",
          });
          setBlogs("");
        } else if (json_.error) {
          console.error(
            "ERROR: Document update failed\n > " +
              JSON.stringify(json_) +
              "\n.............."
          );
          setError(json_.error);
        } else {
          console.error(
            "ERROR: Document update failed with no response\n > " +
              JSON.stringify(json_) +
              "\n.............."
          );
          setError("No Response");
        }
      })
      .catch((err) => {
        setError("ERROR: Saving failed");
        console.error("ERROR: caught error -679\n > " + err.error || err);
      });
  }
  // onDelete
  async function handleDelete(e) {
    e.stopPropagation();
    e.preventDefault();
    // setLoading(true);
    // confirm fields filled
    if (!selectedBlog) {
      toast.error(`Blog not found`);
      return;
    }
    // fetch options
    let fetchOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        docType: "blogpost",
        _id: selectedBlog._id,
      }),
    };
    // DELETE request using fetch
    fetch("/api/admin", fetchOptions)
      .then((res_) => res_.json())
      .then((json_) => {
        if (json_.success) {
          console.log(
            "SUCCESS: Document deleted\n > " +
              JSON.stringify(json_) +
              "\n.............."
          );
          toast.success("Document deleted!");
          setBlogs("");
          setSelectedBlog("");
        } else if (json_.error) {
          console.error(
            "ERROR: failed to delete document\n > " +
              JSON.stringify(json_) +
              "\n.............."
          );
          setError("FAILED: Operation failed");
        } else {
          console.error(
            "ERROR: Document deletion failed with no response\n > " +
              JSON.stringify(json_) +
              "\n.............."
          );
          setError("ERROR... Check connectivity");
        }
      })
      .catch((err) => {
        setError("ERROR: operations failed");
        console.error("ERROR: caught error blog page\n > " + err.error || err);
      });
  }
  // return
  if (UIstate === "OK")
    return (
      <div className="container mx-auto flex flex-wrap py-6">
        {/* <!-- Side Section --> */}

        <aside className="hidden md:w-1/3 md:flex flex-col items-center px-3">
          <div className="w-full p-5 mb-4 border border-font-inactive rounded-lg bg-backg-surface dark:bg-backg-dark-surface max-h-[1500px] overflow-y-auto">
            <p className="text-lg font-medium uppercase">Blogs</p>
            {blogs?.length > 0 ? (
              <ol className="mt-3 divide-y divider-font-inactive">
                {blogs.map((v, i) => (
                  <li
                    key={v._id}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedBlog(blogs.find(({ _id }) => _id === v._id));
                    }}
                    className="cursor-pointer"
                  >
                    <div className="flex flex-col p-3 sm:flex hover:bg-backg dark:hover:bg-backg-dark hover:text-primary-dark">
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
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p>No blogs</p>
            )}
          </div>
        </aside>
        {/* <!-- Posts Section --> */}
        <section className="w-full md:w-2/3 flex flex-col items-center px-3">
          <form
            id=" blogForm"
            className="w-full bg-backg-surface dark:bg-backg-dark-surface rounded-lg shadow p-4 md:p-8"
          >
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
            <div className="flex flex-row space-x-4 mt-4">
              {selectedBlog && (
                <>
                  <ButtonSecondary
                    label="Cancel Selection"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedBlog("");
                    }}
                  />
                  <ButtonSecondary label="Delete post" onClick={handleDelete} />
                </>
              )}
              <ButtonPrimary
                label={!selectedBlog ? `Publish Post` : `Save Post`}
                onClick={handleSave}
              />
            </div>
          </form>
        </section>
      </div>
    );
}
