"use client";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { ButtonPrimary, ButtonSecondary } from "@/components/atoms/buttons";

export default function LibraryPage() {
  const [UIstate, setUIstate] = useState("");
  const [error, setError] = useState("");
  const [library, setLibrary] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const imgCanvas = useRef(null);
  const DBcollection = "library";
  const [itemEdit, setItemEdit] = useState({
    type: "",
    title: "",
    author: "",
    content: "",
    eventDate: "",
    image: "",
    description: "",
  });
  /** image-resizing function
   * @param {string} imgUrl - The source image
   * @param {number} aspectRatio - The aspect ratio
   * @return {boolean} A Promise that resolves with true if successfull
   */
  function imgPreview(imgUrl, aspectRatio = 1) {
    // return a Promise that gets resolved with true if successful
    return new Promise((resolve, reject) => {
      // image to hold source image data
      const inputImage = new Image();
      // wait for image to load
      inputImage.onload = () => {
        // store the width and height of image
        const inputWidth = inputImage.naturalWidth;
        const inputHeight = inputImage.naturalHeight;
        // Calculate the output width and height based on aspect ratio
        let outputWidth, outputHeight;
        if (inputWidth / inputHeight > aspectRatio) {
          outputWidth = inputHeight * aspectRatio;
          outputHeight = inputHeight;
        } else {
          outputWidth = inputWidth;
          outputHeight = inputWidth / aspectRatio;
        }
        // calculate the position to draw the image at
        const outputX = (outputWidth - inputWidth) * 0.5;
        const outputY = (outputHeight - inputHeight) * 0.5;
        // canvas that will present the output image
        const outputImage = imgCanvas.current;
        // set it to the same size as the image
        outputImage.width = outputWidth;
        outputImage.height = outputHeight;
        // draw our image at position {calculated} on the canvas
        const ctx = outputImage.getContext("2d");
        ctx.drawImage(inputImage, outputX, outputY);
        // Resolve the Promise with true
        resolve(true);
      };
      // Handle image load errors
      inputImage.onerror = (error) => {
        reject(error);
      };
      // load image
      setItemEdit({ ...itemEdit, image: imgUrl });
      inputImage.src = URL.createObjectURL(imgUrl);
    });
  }
  // onMount,library - fetch item
  useEffect(() => {
    if (!library) {
      const fetchOptions = { method: "GET" };
      fetch("/api/library", fetchOptions)
        .then((res_) => res_.json())
        .then((json_) => {
          if (json_.success) {
            console.log(
              `SUCCESS: Docs fetched:${json_.success.length}\n.............`
            );
            setLibrary(json_.success);
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
  }, [library]);
  // on selecting library Item
  useEffect(() => {
    if (selectedItem) {
      setItemEdit({
        ...{
          type: "",
          title: "",
          author: "",
          content: "",
          eventDate: "",
          image: "",
          description: "",
        },
        ...selectedItem,
      });
    } else {
      setSelectedItem("");
    }
  }, [selectedItem]);
  // onError
  useEffect(() => {
    if (error) {
      toast.error(error);
      setError("");
    }
  }, [error]);
  // onSubmit
  async function handleSave(e) {
    e.stopPropagation();
    e.preventDefault();
    // setLoading(true);
    // confirm fields filled
    if (!itemEdit.type) {
      toast.error(`Select a valid category`);
      return;
    }
    if (itemEdit.type === "blogspot") {
      if (!itemEdit.title || !itemEdit.author || !itemEdit.content) {
        toast.error(`Error: empty fields`);
        return;
      }
    } else if (itemEdit.type === "event") {
      if (
        !itemEdit.eventDate ||
        !itemEdit.title ||
        !itemEdit.author ||
        !itemEdit.description
      ) {
        toast.error(`Error: empty fields`);
        return;
      }
    } else if (itemEdit.type === "photo") {
      if (!itemEdit.image || !itemEdit.description) {
        toast.error(`Error: empty fields`);
        return;
      }
    }
    // fetch options
    let fetchOptions = "";
    if (!selectedItem) {
      const createHeader = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      if (itemEdit.type === "blogpost") {
        // console.log("SAVING: a new blogpost \n....................");
        fetchOptions = {
          ...createHeader,
          body: JSON.stringify({
            //itemEdit.title,itemEdit.author,itemEdit.content
            type: itemEdit.type,
            title: itemEdit.title,
            author: itemEdit.author,
            content: itemEdit.content,
            colle_: DBcollection,
          }),
        };
      } else if (itemEdit.type === "event") {
        fetchOptions = {
          ...createHeader,
          body: JSON.stringify({
            // itemEdit.eventDate,itemEdit.title,itemEdit.author,itemEdit.description
            type: itemEdit.type,
            date: itemEdit.eventDate,
            name: itemEdit.title,
            host: itemEdit.author,
            description: itemEdit.description,
            colle_: DBcollection,
          }),
        };
      } else if (itemEdit.type === "photo") {
        fetchOptions = {
          ...createHeader,
          body: JSON.stringify({
            // itemEdit.image,itemEdit.description
            type: itemEdit.type,
            image: itemEdit.image,
            description: itemEdit.description,
            colle_: DBcollection,
          }),
        };
      }
    } else {
      const updateHeader = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      if (itemEdit.type === "blogspot") {
        fetchOptions = {
          ...updateHeader,
          body: JSON.stringify({
            //itemEdit.title,itemEdit.author,itemEdit.content
            _id: selectedItem._id,
            type: itemEdit.type,
            title: itemEdit.title,
            author: itemEdit.author,
            content: itemEdit.content,
            colle_: DBcollection,
          }),
        };
      } else if (itemEdit.type === "event") {
        fetchOptions = {
          ...updateHeader,
          body: JSON.stringify({
            // itemEdit.eventDate,itemEdit.title,itemEdit.author,itemEdit.description
            _id: selectedItem._id,
            type: itemEdit.type,
            eventDate: itemEdit.eventDate,
            name: itemEdit.title,
            host: itemEdit.author,
            description: itemEdit.description,
            colle_: DBcollection,
          }),
        };
      } else if (itemEdit.type === "photo") {
        fetchOptions = {
          ...updateHeader,
          body: JSON.stringify({
            // itemEdit.image,itemEdit.description
            _id: selectedItem._id,
            type: itemEdit.type,
            image: itemEdit.image,
            description: itemEdit.description,
            colle_: DBcollection,
          }),
        };
      }
    }
    // make CALL using fetch
    console.log("SAVING........ : \n >" + JSON.stringify(fetchOptions));
    fetch("/api/admin", fetchOptions)
      .then((res_) => res_.json())
      .then((json_) => {
        if (json_.success) {
          console.log(
            "SUCCESS: Document updated\n > " +
              JSON.stringify(json_) +
              "\n.............."
          );
          toast.success("Succesfully saved");
          setItemEdit({
            type: "",
            title: "",
            author: "",
            content: "",
            eventDate: "",
            image: "",
            description: "",
          });
          setLibrary("");
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
        console.error("ERROR: caught error -7840\n > " + err.error || err);
      });
  }
  // onDelete
  async function handleDelete(e) {
    e.stopPropagation();
    e.preventDefault();
    // setLoading(true);
    // confirm fields filled
    if (!selectedItem) {
      toast.error(`Item not found`);
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
        colle_: DBcollection,
        _id: selectedItem._id,
      }),
    };
    // DELETE request using fetch
    console.log("DELETING........ : \n >" + JSON.stringify(fetchOptions));
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
          setLibrary("");
          setSelectedItem("");
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
            <p className="text-lg font-medium uppercase">Gallery</p>
            {library?.length > 0 ? (
              <ol className="mt-3 divide-y divider-font-inactive">
                {library.map((v, i) => (
                  <li
                    key={v._id}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedItem(library.find(({ _id }) => _id === v._id));
                    }}
                    className="cursor-pointer"
                  >
                    <div className="flex flex-col p-3 sm:flex hover:bg-backg dark:hover:bg-backg-dark hover:text-primary-dark">
                      <div className="text-base font-normal">
                        <p className="font-bold lg:text-lg">
                          {v.title || v.name || "Photo"}
                        </p>
                      </div>
                      <div className="text-sm font-normal truncate">
                        {v.author
                          ? `By: ${v.author}`
                          : v.host
                          ? `By: ${v.host}`
                          : v.description}
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
                        {v.eventDate || v.date}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p>Library is empty</p>
            )}
          </div>
        </aside>
        {/* <!-- Posts Section --> */}
        <section className="w-full md:w-2/3 flex flex-col items-center px-3">
          <form
            id=" libraryForm"
            className="w-full bg-backg-surface dark:bg-backg-dark-surface rounded-lg shadow p-4 md:p-8 space-y-2"
          >
            <select
              name="category"
              className="rounded-lg border border-font-inactive focus:border-transparent focus:ring-primary bg-backg-raised dark:bg-backg-dark-raised w-full py-3 px-[14px] text-base outline-none"
              value={itemEdit.type}
              onChange={(e) => {
                e.preventDefault();
                // setItemEdit({ , type: e.target.value });
                setItemEdit({
                  type: e.target.value,
                  title: "",
                  author: "",
                  content: "",
                  eventDate: "",
                  image: "",
                  description: "",
                });
              }}
            >
              <option value="" defaultValue disabled className="italic">
                Select a category...
              </option>
              <option value="blogpost">Blogpost</option>
              <option value="photo">Photo</option>
              <option value="event">Event</option>
            </select>
            {itemEdit.type === "blogpost" ? (
              <>
                <input
                  type="text"
                  placeholder="Title..."
                  className="rounded-lg border border-font-inactive focus:border-transparent focus:ring-primary bg-backg-raised dark:bg-backg-dark-raised w-full py-3 px-[14px] text-base outline-none placeholder:italic"
                  value={itemEdit.title}
                  onChange={(e) => {
                    e.preventDefault();
                    setItemEdit({ ...itemEdit, title: e.target.value });
                  }}
                />
                <input
                  type="text"
                  placeholder="Author..."
                  className="rounded-lg border border-font-inactive focus:border-transparent focus:ring-primary bg-backg-raised dark:bg-backg-dark-raised w-full py-3 px-[14px] text-base outline-none placeholder:italic"
                  value={itemEdit.author}
                  onChange={(e) => {
                    e.preventDefault();
                    setItemEdit({ ...itemEdit, author: e.target.value });
                  }}
                />
                <div>
                  <label htmlFor="article" className="sr-only">
                    Article
                  </label>
                  <textarea
                    id="article"
                    rows="16"
                    className="block w-full bg-transparent border border-font-inactive focus:border-transparent focus:ring-primary px-[7px] text-base outline-none placeholder:italic"
                    placeholder="Write an article..."
                    required
                    value={itemEdit.content}
                    onChange={(e) => {
                      e.preventDefault();
                      setItemEdit({ ...itemEdit, content: e.target.value });
                    }}
                  />
                </div>
              </>
            ) : itemEdit.type === "event" ? (
              <>
                <input
                  type="date"
                  placeholder="Date..."
                  className="rounded-lg border border-font-inactive focus:border-transparent focus:ring-primary bg-backg-raised dark:bg-backg-dark-raised w-full py-3 px-[14px] text-base outline-none placeholder:italic"
                  value={itemEdit.eventDate}
                  onChange={(e) => {
                    e.preventDefault();
                    setItemEdit({ ...itemEdit, eventDate: e.target.value });
                  }}
                />
                <input
                  type="text"
                  placeholder="Name..."
                  className="rounded-lg border border-font-inactive focus:border-transparent focus:ring-primary bg-backg-raised dark:bg-backg-dark-raised w-full py-3 px-[14px] text-base outline-none placeholder:italic"
                  value={itemEdit.title}
                  onChange={(e) => {
                    e.preventDefault();
                    setItemEdit({ ...itemEdit, title: e.target.value });
                  }}
                />
                <input
                  type="text"
                  placeholder="Host..."
                  className="rounded-lg border border-font-inactive focus:border-transparent focus:ring-primary bg-backg-raised dark:bg-backg-dark-raised w-full py-3 px-[14px] text-base outline-none placeholder:italic"
                  value={itemEdit.author}
                  onChange={(e) => {
                    e.preventDefault();
                    setItemEdit({ ...itemEdit, author: e.target.value });
                  }}
                />
                <div>
                  <label htmlFor="description" className="sr-only">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="2"
                    className="block w-full bg-transparent border rounded-lg border-font-inactive focus:border-transparent focus:ring-primary bg-backg-raised dark:bg-backg-dark-raised px-[7px] text-base outline-none placeholder:italic"
                    placeholder="Event description..."
                    required
                    value={itemEdit.description}
                    onChange={(e) => {
                      e.preventDefault();
                      setItemEdit({ ...itemEdit, content: e.target.value });
                    }}
                  />
                </div>
              </>
            ) : itemEdit.type === "photo" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="block w-full bg-transparent border rounded-lg border-font-inactive focus:border-transparent focus:ring-primary bg-backg-raised dark:bg-backg-dark-raised px-[7px] text-base outline-none aspect-square">
                  {!itemEdit.image && (
                    <label
                      htmlFor="image-upload"
                      className={`flex w-full h-full items-center justify-center text-center text-font-inactive p-4 text-sm cursor-pointer`}
                    >
                      Drop your image here or click to browse
                    </label>
                  )}
                  <input
                    name="file"
                    type="file"
                    id="image-upload"
                    // accept="image/*"
                    accept=".png, .jpg, .jpeg"
                    className="hidden"
                    // value={image}
                    onChange={async (e) => {
                      console.log(
                        ` > uploading image: ${e.target.value} ... \n`
                      );
                      if (e.target.files && e.target.files[0]) {
                        const imgUrl = e.target.files[0];
                        if (
                          !imgUrl.name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)
                        ) {
                          setError("Invalid image file: select JPG,JPEG,PNG");
                          return;
                        }
                        imgPreview(imgUrl, 1)
                          .then((res_) => {
                            if (res_ === true) {
                              toast.success("Image loaded successfully");
                            } else {
                              toast.error("Failed to load image");
                            }
                          })
                          .catch((error) => {
                            console.error("Error loading image:", error);
                          });
                      }
                    }}
                  />
                  {/* <!-- Image upload input --> */}
                  {itemEdit.image && (
                    <div
                      className={`items-center justify-center flex flex-col`}
                    >
                      <div className="preview-image flex flex-col justify-center items-center w-full h-full rounded-lg">
                        {/* {image && (
                          <Image
                            src={image.previewURL}
                            className="object-contain"
                            width={300}
                            height={300}
                            // fill={true}
                            alt="product image"
                          />
                        )} */}
                        <canvas
                          ref={imgCanvas}
                          className="w-full h-full mt-2 rounded"
                        />
                        <canvas id="blankCanvas" className="hidden" />
                      </div>
                      {/* <span className="file-name my-4 text-sm font-medium"></span> */}
                      <button
                        className="cursor-pointer transition-all my-2 rounded-md px-3 py-1 border border-font-inactive text-xs hover:border-state-danger"
                        // onClick={() => setItemEdit({ ...itemEdit, image: ""})}
                        onClick={(e) => {
                          e.preventDefault();
                          let canvasContext =
                            imgCanvas.current.getContext("2d");
                          canvasContext.clearRect(
                            0,
                            0,
                            canvasContext.width,
                            canvasContext.height
                          );
                          setItemEdit({ ...itemEdit, image: "" });
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="description" className="sr-only">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="3"
                    className="block w-full bg-transparent border rounded-lg border-font-inactive focus:border-transparent focus:ring-primary bg-backg-raised dark:bg-backg-dark-raised px-[7px] text-base outline-none placeholder:italic"
                    placeholder="Photo description..."
                    required
                    value={itemEdit.description}
                    onChange={(e) => {
                      e.preventDefault();
                      setItemEdit({ ...itemEdit, content: e.target.value });
                    }}
                  />
                </div>
              </div>
            ) : null}
            {(itemEdit.title || itemEdit.image) && (
              <div className="flex flex-row space-x-4 pt-4">
                {selectedItem && (
                  <>
                    <ButtonSecondary
                      label="Cancel Selection"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedItem("");
                      }}
                    />
                    <ButtonSecondary
                      label="Delete selection"
                      onClick={handleDelete}
                    />
                  </>
                )}
                <ButtonPrimary
                  label={!selectedItem ? `Create item` : `Edit item`}
                  onClick={handleSave}
                />
              </div>
            )}
          </form>
        </section>
      </div>
    );
}
