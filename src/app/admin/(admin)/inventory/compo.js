"use client";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { ButtonPrimary, ButtonSecondary } from "@/components/atoms/buttons";
import Loader from "@/components/loader";

export function ModalAddProduct({ handleClose }) {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const imgCanvas = useRef(null);
  // on Mount
  useEffect(() => {
    setLoading(false);
  }, []);
  // on ERROR
  useEffect(() => {
    if (error) {
      toast.error(error);
      setError("");
      setLoading(false);
    }
  }, [error]);

  async function handleSubmit() {
    setLoading(true);
    // confirm fields filled
    if (!category || !name || !description || !price || !image) {
      setError(`Fill empty fields`);
      return;
    }
    // Process canvas into binary
    // const imgBuffer = Buffer.from(
    //   imgCanvas.current.toDataURL("image/jpeg", 0.5),
    //   "base64"
    // );
    const imgSTR = imgCanvas.current.toDataURL("image/jpeg", 1);
    // fetch options
    let fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        category,
        name,
        description,
        price,
        // image: imgBuffer,
        image: imgSTR,
      }),
    };
    // POST request using fetch
    fetch("/api/admin", fetchOptions)
      .then((res_) => res_.json())
      .then((json_) => {
        if (json_.success) {
          console.log(
            "SUCCESS: New document created\n > " +
              JSON.stringify(json_) +
              "\n.............."
          );
          toast.success("Product saved!");
          handleClose();
        } else if (json_.error) {
          console.error(
            "ERROR: Document creation failed\n > " +
              JSON.stringify(json_) +
              "\n.............."
          );
          setError("FAILED: Document was not created");
        } else {
          console.error(
            "ERROR: Document creation failed\n > " +
              JSON.stringify(json_) +
              "\n.............."
          );
          setError("No Response");
        }
      })
      .catch((err) => {
        setError("ERROR occured");
        console.error("ERROR: caught error\n > " + err.error || err);
      });
  }

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
      setImage(imgUrl);
      inputImage.src = URL.createObjectURL(imgUrl);
    });
  }

  return (
    <div
      id="modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-backg dark:bg-backg-dark bg-opacity-90 flex items-center justify-center`}
    >
      <div className="relative w-full max-w-screen-lg max-h-full my-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-backg-surface rounded-lg shadow dark:bg-backg-dark-surface">
          {/* <!-- Modal header --> */}
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-font-inactive">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add Product
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
              onClick={handleClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          {loading ? (
            <Loader />
          ) : (
            <form className="flex flex-col justify-center p-4 sm:p-8 lg:p-12 sm:flex-row sm:space-x-4 md:space-x-8">
              <div className="flex flex-col justify-center sm:w-1/2">
                {/* FIELD Category */}
                <div className="relative flex items-center mb-2 w-full ">
                  <select
                    name="category"
                    className={`${
                      !category ? "italic" : ""
                    } w-full px-3 py-2 transition-all border border-font-inactive rounded-lg appearance-none bg-backg-raised dark:bg-backg-dark-raised cursor-pointer enabled:hover:border-primary-dark disabled:opacity-50 disabled:cursor-not-allowed invalid:italic`}
                    value={category}
                    onChange={(e) => {
                      console.log(
                        ` > Product category selected: ${e.target.value} ... \n`
                      );
                      setCategory(e.target.value);
                    }}
                  >
                    <option value="" defaultValue>
                      Select a Product category...
                    </option>
                    <option value="Car">Car</option>
                    <option value="Part">Part</option>
                    <option value="Service">Service</option>
                  </select>
                </div>
                {/* FIELD Name */}
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="w-full px-3 py-2 mb-2 transition-all bg-backg-raised dark:bg-backg-dark-raised border border-font-inactive rounded-lg enabled:hover:border-primary-dark disabled:opacity-50 disabled:cursor-not-allowedk placeholder:italic"
                  value={name}
                  autoComplete="name"
                  disabled={!category}
                  onChange={(e) => {
                    console.log(
                      ` > typing product name: ${e.target.value} ... \n`
                    );
                    setName(e.target.value);
                  }}
                />
                {/* FIELD Description */}
                <input
                  name="description"
                  type="text"
                  placeholder="Description"
                  maxLength="40"
                  className="w-full px-3 py-2 mb-2 transition-all bg-backg-raised dark:bg-backg-dark-raised border border-font-inactive rounded-lg enabled:hover:border-primary-dark disabled:opacity-50 disabled:cursor-not-allowed placeholder:italic"
                  value={description}
                  disabled={!category}
                  onChange={(e) => {
                    console.log(
                      ` > typing description:${e.target.value} ... \n`
                    );
                    setDescription(e.target.value);
                  }}
                />
                {/* FIELD Price */}
                <input
                  name="price"
                  type="number"
                  inputMode="numeric"
                  placeholder="Price"
                  className="w-full px-3 py-2 mb-2 transition-all bg-backg-raised dark:bg-backg-dark-raised border border-font-inactive rounded-lg enabled:hover:border-primary-dark disabled:opacity-50 disabled:cursor-not-allowed placeholder:italic"
                  value={price}
                  disabled={!category}
                  onChange={(e) => {
                    if (e.target.value > 1000000000) {
                      e.preventDefault();
                      e.stopPropagation();
                      setError("Price cannot exceed 1 billion");
                    } else {
                      console.log(` > typing price: ${e.target.value} ... \n`);
                      setPrice(e.target.value);
                    }
                  }}
                />
                {/* <textarea
                name="message"
                id=""
                cols="30"
                rows="4"
                placeholder="Message"
                className="w-full px-3 py-2 mb-2 resize-none transition-all border rounded-md"
              ></textarea> */}
              </div>
              {/* FIELD Image */}
              <div className="upload-container max-w-[148px] relative flex items-center justify-between sm:min-h-1/2">
                <div className="drop-area w-full sm:h-full rounded-lg border-2 border-dotted border-font-inactive transition-all hover:border-primary-dark text-center">
                  {!image && (
                    <label
                      htmlFor="file-input"
                      className={`flex w-full h-full items-center justify-center text-font-inactive p-4 text-sm cursor-pointer`}
                    >
                      Drop your image here or click to browse
                    </label>
                  )}
                  <input
                    name="file"
                    type="file"
                    id="file-input"
                    accept="image/*"
                    // accept=".png, .jpg, .jpeg"
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
                              toast.success("Image uploaded successfully");
                            } else {
                              toast.error("Failed to upload image");
                            }
                          })
                          .catch((error) => {
                            console.error("Error loading image:", error);
                          });
                      }
                    }}
                  />
                  {/* <!-- Image upload input --> */}
                  {image && (
                    <div
                      className={`items-center justify-center flex flex-col`}
                    >
                      <div className="preview-image flex flex-col justify-center items-center w-36 h-36 rounded-lg">
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
                        <canvas ref={imgCanvas} className="w-36 h-36" />
                        <canvas id="blankCanvas" className="hidden" />
                      </div>
                      {/* <span className="file-name my-4 text-sm font-medium"></span> */}
                      <button
                        className="cursor-pointer transition-all my-2 rounded-md px-3 py-1 border border-font-inactive text-xs text-state-danger hover:border-state-danger"
                        // onClick={() => setImage("")}
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
                          setImage(null);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </form>
          )}
          {/* <!-- Modal footer --> */}
          <div className="flex items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <ButtonSecondary label="Cancel" onClick={handleClose} />
            <ButtonPrimary
              type="submit"
              label="Save Product"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ModalEditProduct({ product, handleClose }) {
  const [category, setCategory] = useState(product.category);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(product.image);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const imgCanvas = useRef(null);
  // on Mount and change in product.image
  useEffect(() => {
    // canvas that will present the output image
    let canvas_ = imgCanvas.current;
    if (!canvas_) return;
    let ctx = canvas_.getContext("2d");
    // image constructor
    let img = new Image();
    // will run after image is loaded
    img.onload = function () {
      // new width and height
      let newWidth = (img.width * canvas_.width) / img.width;
      let newHeight = (img.height * canvas_.height) / img.height;
      // draw on canvas
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      setLoading(false);
    };
    // load image
    img.src = product.image;
    // update component's loading state
  }, [product.image]);
  // on ERROR
  useEffect(() => {
    if (error) {
      toast.error(error);
      setError("");
      setLoading(false);
    }
  }, [error]);
  // save
  async function handleSave() {
    setLoading(true);
    // confirm fields filled
    if (!category || !name || !description || !price || !image) {
      setError(`Fill empty fields`);
      return;
    }
    // Process canvas into dataURL string
    const imgSTR = imgCanvas.current.toDataURL("image/jpeg", 1);
    // fetch options
    let fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        category,
        name,
        description,
        price,
        image: imgSTR,
        _id: product._id,
      }),
    };
    // PUT request using fetch
    fetch("/api/admin", fetchOptions)
      .then((res_) => res_.json())
      .then((json_) => {
        if (json_.success) {
          console.log(
            "SUCCESS: Document updated\n > " +
              JSON.stringify(json_) +
              "\n.............."
          );
          toast.success("Product saved!");
          handleClose();
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
  // delete
  async function handleDelete() {
    setLoading(true);
    // confirm fields filled
    if (!product._id) {
      setError(`Cannot find product`);
      handleClose();
    }
    // fetch options
    let fetchOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        _id: product._id,
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
          toast.success("Product deleted!");
          handleClose();
        } else if (json_.error) {
          console.error(
            "ERROR: failed to delete product\n > " +
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
        console.error("ERROR: caught error -92043\n > " + err.error || err);
      });
  }

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
      setImage(imgUrl);
      inputImage.src = URL.createObjectURL(imgUrl);
    });
  }

  return (
    <div
      id="modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-backg dark:bg-backg-dark bg-opacity-90 flex items-center justify-center`}
    >
      <div className="relative w-full max-w-screen-lg max-h-full my-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-backg-surface rounded-lg shadow dark:bg-backg-dark-surface">
          {/* <!-- Modal header --> */}
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-font-inactive">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Edit Product
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
              onClick={handleClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          {loading ? (
            <Loader />
          ) : (
            <form className="flex flex-col justify-center p-4 sm:p-8 lg:p-12 sm:flex-row sm:space-x-4 md:space-x-8">
              <div className="flex flex-col justify-center sm:w-1/2">
                {/* FIELD Category */}
                <div className="relative flex items-center mb-2 w-full ">
                  <select
                    name="category"
                    className={`${
                      !category ? "italic" : ""
                    } w-full px-3 py-2 transition-all border border-font-inactive rounded-lg appearance-none bg-backg-raised dark:bg-backg-dark-raised cursor-pointer enabled:hover:border-primary-dark disabled:opacity-50 disabled:cursor-not-allowed invalid:italic`}
                    value={category}
                    onChange={(e) => {
                      console.log(
                        ` > Product category selected: ${e.target.value} ... \n`
                      );
                      setCategory(e.target.value);
                    }}
                  >
                    <option value="" defaultValue>
                      Select a Product category...
                    </option>
                    <option value="Car">Car</option>
                    <option value="Part">Part</option>
                    <option value="Service">Service</option>
                  </select>
                </div>
                {/* FIELD Name */}
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="w-full px-3 py-2 mb-2 transition-all bg-backg-raised dark:bg-backg-dark-raised border border-font-inactive rounded-lg enabled:hover:border-primary-dark disabled:opacity-50 disabled:cursor-not-allowedk placeholder:italic"
                  value={name}
                  autoComplete="name"
                  disabled={!category}
                  onChange={(e) => {
                    console.log(
                      ` > typing product name: ${e.target.value} ... \n`
                    );
                    setName(e.target.value);
                  }}
                />
                {/* FIELD Description */}
                <input
                  name="description"
                  type="text"
                  placeholder="Description"
                  maxLength="40"
                  className="w-full px-3 py-2 mb-2 transition-all bg-backg-raised dark:bg-backg-dark-raised border border-font-inactive rounded-lg enabled:hover:border-primary-dark disabled:opacity-50 disabled:cursor-not-allowed placeholder:italic"
                  value={description}
                  disabled={!category}
                  onChange={(e) => {
                    console.log(
                      ` > typing description:${e.target.value} ... \n`
                    );
                    setDescription(e.target.value);
                  }}
                />
                {/* FIELD Price */}
                <input
                  name="price"
                  type="number"
                  inputMode="numeric"
                  placeholder="Price"
                  className="w-full px-3 py-2 mb-2 transition-all bg-backg-raised dark:bg-backg-dark-raised border border-font-inactive rounded-lg enabled:hover:border-primary-dark disabled:opacity-50 disabled:cursor-not-allowed placeholder:italic"
                  value={price}
                  disabled={!category}
                  onChange={(e) => {
                    if (e.target.value > 1000000000) {
                      e.preventDefault();
                      e.stopPropagation();
                      setError("Price cannot exceed 1 billion");
                    } else {
                      console.log(` > typing price: ${e.target.value} ... \n`);
                      setPrice(e.target.value);
                    }
                  }}
                />
              </div>
              {/* FIELD Image */}
              <div className="upload-container max-w-[148px] relative flex items-center justify-between sm:min-h-1/2">
                <div className="drop-area w-full sm:h-full rounded-lg border-2 border-dotted border-font-inactive transition-all hover:border-primary-dark text-center">
                  {!image && (
                    <label
                      htmlFor="file-input"
                      className={`flex w-full h-full items-center justify-center text-font-inactive p-4 text-sm cursor-pointer`}
                    >
                      Drop your image here or click to browse
                    </label>
                  )}
                  <input
                    name="file"
                    type="file"
                    id="file-input"
                    accept="image/*"
                    // accept=".png, .jpg, .jpeg"
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
                              toast.success("Image uploaded successfully");
                            } else {
                              toast.error("Failed to upload image");
                            }
                          })
                          .catch((error) => {
                            console.error("Error loading image:", error);
                          });
                      }
                    }}
                  />
                  {/* <!-- Image upload input --> */}
                  {image && (
                    <div
                      className={`items-center justify-center flex flex-col`}
                    >
                      <div className="preview-image flex flex-col justify-center items-center w-36 h-36 rounded-lg">
                        <canvas ref={imgCanvas} className="w-36 h-36" />
                        <canvas id="blankCanvas" className="hidden" />
                      </div>
                      <button
                        className="cursor-pointer transition-all my-2 rounded-md px-3 py-1 border border-font-inactive text-xs text-state-danger hover:border-state-danger"
                        // onClick={() => setImage("")}
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
                          setImage(null);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </form>
          )}
          {/* <!-- Modal footer --> */}
          <div className="flex items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <ButtonSecondary label="Delete Product" onClick={handleDelete} />
            <ButtonPrimary
              type="submit"
              label="Save Changes"
              onClick={(e) => {
                e.preventDefault();
                handleSave();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductOptions({ options }) {
  const { x, y, id } = options;
  return (
    <div
      id="itemOptions"
      className={`fixed z-10 top-[226px] left-[210px] bg-backg-raised divide-y divide-font-inactive rounded-lg shadow w-32 dark:bg-backg-dark-raised`}
    >
      <ul className="py-2 text-sm">
        <li>
          <button className="text-left block w-full px-4 py-2 hover:bg-backg dark:hover:bg-backg-dark">
            Edit
          </button>
        </li>
        <li>
          <button className="text-left block w-full px-4 py-2 hover:bg-backg dark:hover:bg-backg-dark">
            Delete Product
          </button>
        </li>
      </ul>
    </div>
  );
}
