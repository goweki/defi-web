"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { resizeImage } from "@/helpers/imageHandlers";

import { ButtonPrimary, ButtonSecondary } from "@/components/atoms/buttons";

export function ModalAddProduct({ isVisible, handleClose }) {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  // on ERROR
  useEffect(() => {
    if (error) {
      toast.error(error);
      setError("");
    }
  }, [error]);

  async function handleSubmit() {
    // confirm fields filled
    if (!category || !name || !description || !price || !image.img) {
      setError(`Fill empty fields`);
      return;
    }
    // process image into binary
    const imgBuffer = Buffer.from(image.img);
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
        image: imgBuffer,
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
          setError(json_.error);
        } else {
          console.error(
            "ERROR: Document creation failed\n > " +
              JSON.stringify(json_) +
              "\n.............."
          );
          setError("Unknown Error");
        }
      })
      .catch((err) => {
        setError(err.error || err);
        console.error("ERROR: caught error\n > " + err.error || err);
      });
  }
  return (
    <div
      id="modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`${
        isVisible ? "" : "hidden"
      } fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-backg dark:bg-backg-dark bg-opacity-90 flex items-center justify-center`}
    >
      <div className="relative w-full max-w-screen-lg max-h-full my-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-backg-surface rounded-lg shadow dark:bg-backg-dark-surface">
          {/* <!-- Modal header --> */}
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-font-inactive">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Product
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
                  console.log(` > typing description:${e.target.value} ... \n`);
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
            <div className="upload-container relative flex items-center justify-between sm:min-h-1/2">
              <div className="drop-area w-full sm:h-full rounded-lg border-2 border-dotted border-font-inactive transition-all hover:border-primary-dark text-center">
                <label
                  htmlFor="file-input"
                  className={`${
                    image ? "hidden" : ""
                  } flex w-full h-full items-center justify-center text-font-inactive p-4 text-sm cursor-pointer`}
                >
                  Drop your image here or click to browse
                </label>
                <input
                  name="file"
                  type="file"
                  id="file-input"
                  accept="image/*"
                  // accept=".png, .jpg, .jpeg"
                  className="hidden"
                  // value={image}
                  onChange={async (e) => {
                    console.log(` > uploading image: ${e.target.value} ... \n`);
                    if (e.target.files && e.target.files[0]) {
                      const image_ = await resizeImage(e.target.files[0]);
                      setImage({
                        img: image_,
                        previewURL: URL.createObjectURL(e.target.files[0]),
                      });
                    }
                  }}
                />
                {/* <!-- Image upload input --> */}
                <div
                  className={`${
                    !image ? "hidden" : ""
                  } items-center justify-center flex flex-col`}
                >
                  <div className="preview-image m-4 flex flex-col justify-center items-center w-36 h-36 rounded-lg">
                    {/* <img alt="preview image" src={image}/> */}
                    {image && (
                      <Image
                        src={image.previewURL}
                        className="object-contain"
                        width={500}
                        height={500}
                        // fill={true}
                        alt="product image"
                      />
                    )}
                  </div>
                  <span className="file-name my-4 text-sm font-medium"></span>
                  <button
                    className="close-button cursor-pointer transition-all mb-4 rounded-md px-3 py-1 border border-font-inactive text-xs text-state-danger hover:border-state-danger"
                    onClick={() => setImage("")}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </form>
          {/* <!-- Modal footer --> */}
          <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
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
