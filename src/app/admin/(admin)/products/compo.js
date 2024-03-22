"use client";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { ButtonPrimary, ButtonSecondary } from "@/components/atoms/buttons";
import Loader from "@/components/loader";
import Image from "next/image";
const DBcollection = "products";

export function ModalAddProduct({ handleClose }) {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState("");
  const [error, setError] = useState("");
  const [UIstate, setUIstate] = useState("loading");
  const imgCanvas = useRef(null);
  // on Mount
  useEffect(() => {
    setUIstate("OK");
  }, []);
  // on ERROR
  useEffect(() => {
    if (error) {
      toast.error(error);
      setError("");
      setUIstate("OK");
    }
  }, [error]);

  async function handleSubmit() {
    // confirm fields filled
    if (!category || !name || !description || !price || !image) {
      setError(`Fill empty fields`);
      return;
    }
    // UI state
    setUIstate("loading");
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
        images: [],
        colle_: DBcollection,
      }),
    };
    // POST request using fetch
    fetch("/api/admin", fetchOptions)
      .then((res_) => {
        if (res_.status === 200) return res_.json();
        else throw new Error(res_.status);
      })
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
        console.error("ERROR: caught error\n > " + err.message);
      });
  }

  return (
    <div
      id="modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`transition fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-backg dark:bg-backg-dark bg-opacity-90 flex items-center justify-center`}
    >
      <div className="relative w-full max-w-screen-lg max-h-full my-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-backg-surface rounded-lg shadow dark:bg-backg-dark-surface">
          {/* <!-- Modal header --> */}
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-font-inactive">
            <h3 className="text-xl font-semibold">Add Product</h3>
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
          {UIstate === "loading" ? (
            <Loader />
          ) : (
            <form className="flex flex-col justify-center p-4 sm:p-8 lg:p-12 sm:flex-row sm:space-x-4 md:space-x-8">
              <div className="flex flex-col justify-center sm:w-1/2 space-y-2">
                {/* FIELD Category */}
                <div className="relative flex items-center w-full ">
                  <select
                    name="category"
                    className={`w-full px-3 py-2 transition-all border border-font-inactive rounded-lg appearance-none bg-backg-raised dark:bg-backg-dark-raised cursor-pointer enabled:hover:border-primary-dark focus:border-transparent focus:ring-primary outline-none placeholder:italic disabled:opacity-50 disabled:cursor-not-allowed invalid:italic`}
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  >
                    <option value="" defaultValue disabled>
                      Select a Product category...
                    </option>
                    <option value="Car">Car</option>
                    <option value="Service">Service</option>
                    <option value="Part">Part</option>
                    <option value="Accessory">Accessory</option>
                  </select>
                </div>
                {/* FIELD Name */}
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="w-full px-3 py-2 transition-all border border-font-inactive rounded-lg appearance-none bg-backg-raised dark:bg-backg-dark-raised cursor-pointer enabled:hover:border-primary-dark focus:border-transparent focus:ring-primary outline-none placeholder:italic disabled:opacity-50 disabled:cursor-not-allowed invalid:italic"
                  value={name}
                  autoComplete="name"
                  disabled={!category}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                {/* FIELD Description */}
                <input
                  name="description"
                  type="text"
                  placeholder="Description"
                  maxLength="40"
                  className="w-full px-3 py-2 transition-all border border-font-inactive rounded-lg appearance-none bg-backg-raised dark:bg-backg-dark-raised cursor-pointer enabled:hover:border-primary-dark focus:border-transparent focus:ring-primary outline-none placeholder:italic disabled:opacity-50 disabled:cursor-not-allowed invalid:italic"
                  value={description}
                  disabled={!category}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                {/* FIELD Price */}
                <input
                  name="price"
                  type="number"
                  inputMode="numeric"
                  placeholder="Price"
                  className="w-full px-3 py-2 transition-all border border-font-inactive rounded-lg appearance-none bg-backg-raised dark:bg-backg-dark-raised cursor-pointer enabled:hover:border-primary-dark focus:border-transparent focus:ring-primary outline-none placeholder:italic disabled:opacity-50 disabled:cursor-not-allowed invalid:italic"
                  value={price}
                  disabled={!category}
                  onChange={(e) => {
                    if (e.target.value > 1000000000) {
                      e.preventDefault();
                      e.stopPropagation();
                      setError("Price cannot exceed 1 billion");
                    } else {
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
              {images[0] && (
                <div className="upload-container max-w-[148px] relative flex items-center justify-between sm:min-h-1/2">
                  <Image
                    src={images[0]}
                    className="object-contain"
                    width={300}
                    height={300}
                    // fill={true}
                    alt="product image"
                  />
                </div>
              )}
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
