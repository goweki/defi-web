"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ButtonPrimary, ButtonSecondary } from "@/components/atoms/buttons";
import Loader from "@/components/loader";
import Image from "next/image";
const DBcollection = "products";

export function ModalAddProduct({ handleClose }) {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setavailability] = useState("local");
  const [property1, setProperty1] = useState({ name: "", value: "" });
  const [property2, setProperty2] = useState({ name: "", value: "" });
  const [property3, setProperty3] = useState({ name: "", value: "" });
  const [images, setImages] = useState(new Array(2).fill(""));
  const [error, setError] = useState("");
  const [UIstate, setUIstate] = useState("loading");
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
    if (!name || !category || !price || !property1.name || !property1.value) {
      console.log();
      toast.error("An error occured!");
      setUIstate("OK");
      return;
    }
    if (!images[0]) {
      setError(`Upload at least one image`);
      return;
    }
    // UI state
    // setUIstate("loading");
    // decription onj
    let description_ = [property1, property2, property3];
    const _description = description_.map((v, i) => {
      if (v.value) {
        let obj = {};
        obj[v.name] = v.value;
        return obj;
      }
    });
    const description = _description.filter((n) => n);
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
        price,
        description,
        images: images[1] ? [images[0], images[1]] : [images[0]],
        colle_: DBcollection,
        availability: availability || "local",
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

  async function handleNext() {
    if (!category || !name || !price || !property1.name || !property1.value) {
      console.log(!property1.name);
      setError(`Please fill empty fields`);
      return;
    }
    setUIstate("next");
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
          ) : UIstate === "OK" ? (
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
                {/* FIELD Property-1 */}
                {name && (
                  <div className="grid grid-cols-2 gap-x-2">
                    <input
                      name="property1-name"
                      type="text"
                      placeholder="property-1 name"
                      maxLength="40"
                      className="w-full px-3 py-2 transition-all border border-font-inactive rounded-lg appearance-none bg-backg-raised dark:bg-backg-dark-raised cursor-pointer enabled:hover:border-primary-dark focus:border-transparent focus:ring-primary outline-none placeholder:italic disabled:opacity-50 disabled:cursor-not-allowed invalid:italic"
                      value={property1.name}
                      disabled={!category}
                      onChange={(e) => {
                        setProperty1((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }));
                      }}
                    />
                    <input
                      name="property1-value"
                      type="text"
                      placeholder="property-1 value"
                      maxLength="40"
                      className="w-full px-3 py-2 transition-all border border-font-inactive rounded-lg appearance-none bg-backg-raised dark:bg-backg-dark-raised cursor-pointer enabled:hover:border-primary-dark focus:border-transparent focus:ring-primary outline-none placeholder:italic disabled:opacity-50 disabled:cursor-not-allowed invalid:italic"
                      value={property1.value}
                      disabled={!property1.name}
                      onChange={(e) => {
                        setProperty1((prev) => ({
                          ...prev,
                          value: e.target.value,
                        }));
                      }}
                    />
                  </div>
                )}
                {/* FIELD Property-2 */}
                {property1.value && (
                  <div className="grid grid-cols-2 gap-x-2">
                    <input
                      name="property2-name"
                      type="text"
                      placeholder="property-2 name"
                      maxLength="40"
                      className="w-full px-3 py-2 transition-all border border-font-inactive rounded-lg appearance-none bg-backg-raised dark:bg-backg-dark-raised cursor-pointer enabled:hover:border-primary-dark focus:border-transparent focus:ring-primary outline-none placeholder:italic disabled:opacity-50 disabled:cursor-not-allowed invalid:italic"
                      value={property2.name}
                      disabled={!property1.value}
                      onChange={(e) => {
                        setProperty2((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }));
                      }}
                    />
                    <input
                      name="property2-value"
                      type="text"
                      placeholder="property-2 value"
                      maxLength="40"
                      className="w-full px-3 py-2 transition-all border border-font-inactive rounded-lg appearance-none bg-backg-raised dark:bg-backg-dark-raised cursor-pointer enabled:hover:border-primary-dark focus:border-transparent focus:ring-primary outline-none placeholder:italic disabled:opacity-50 disabled:cursor-not-allowed invalid:italic"
                      value={property2.value}
                      disabled={!property2.name}
                      onChange={(e) => {
                        setProperty2((prev) => ({
                          ...prev,
                          value: e.target.value,
                        }));
                      }}
                    />
                  </div>
                )}
                {/* FIELD Property-3 */}
                {property2.value && (
                  <div className="grid grid-cols-2 gap-x-2">
                    <input
                      name="property3-name"
                      type="text"
                      placeholder="property-3 name"
                      maxLength="40"
                      className="w-full px-3 py-2 transition-all border border-font-inactive rounded-lg appearance-none bg-backg-raised dark:bg-backg-dark-raised cursor-pointer enabled:hover:border-primary-dark focus:border-transparent focus:ring-primary outline-none placeholder:italic disabled:opacity-50 disabled:cursor-not-allowed invalid:italic"
                      value={property3.name}
                      disabled={!property2.value}
                      onChange={(e) => {
                        setProperty3((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }));
                      }}
                    />
                    <input
                      name="property3-value"
                      type="text"
                      placeholder="property-3 value"
                      maxLength="40"
                      className="w-full px-3 py-2 transition-all border border-font-inactive rounded-lg appearance-none bg-backg-raised dark:bg-backg-dark-raised cursor-pointer enabled:hover:border-primary-dark focus:border-transparent focus:ring-primary outline-none placeholder:italic disabled:opacity-50 disabled:cursor-not-allowed invalid:italic"
                      value={property3.value}
                      disabled={!property3.name}
                      onChange={(e) => {
                        setProperty3((prev) => ({
                          ...prev,
                          value: e.target.value,
                        }));
                      }}
                    />
                  </div>
                )}
                {/* FIELD Price */}
                {name && (
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
                )}
              </div>
            </form>
          ) : UIstate === "next" ? (
            <form className="flex flex-col justify-center p-4 sm:p-8 lg:p-12 sm:flex-row sm:space-x-4 md:space-x-8">
              <div className="flex flex-col justify-center sm:w-1/2 space-y-2">
                {/* FIELD image-1 */}
                <input
                  name="image-1"
                  type="text"
                  placeholder="image 1"
                  className="w-full px-3 py-2 transition-all border border-font-inactive rounded-lg appearance-none bg-backg-raised dark:bg-backg-dark-raised cursor-pointer enabled:hover:border-primary-dark focus:border-transparent focus:ring-primary outline-none placeholder:italic disabled:opacity-50 disabled:cursor-not-allowed invalid:italic"
                  value={images[0]}
                  onChange={(e) => {
                    setImages((prev) => [
                      e.target.value,
                      prev[1],
                      e.target.value,
                    ]);
                  }}
                />
                {images[0] && (
                  <input
                    name="image-2"
                    type="text"
                    placeholder="image 2"
                    className="w-full px-3 py-2 transition-all border border-font-inactive rounded-lg appearance-none bg-backg-raised dark:bg-backg-dark-raised cursor-pointer enabled:hover:border-primary-dark focus:border-transparent focus:ring-primary outline-none placeholder:italic disabled:opacity-50 disabled:cursor-not-allowed invalid:italic"
                    value={images[1]}
                    onChange={(e) => {
                      setImages((prev) => [
                        prev[0],
                        e.target.value,
                        e.target.value,
                      ]);
                    }}
                  />
                )}
              </div>
              {/* FIELD Image */}
              {images[0] && (
                <div className="lg:flex lg:items-start lg:justify-center">
                  <div className="mt-2 w-full lg:w-32 lg:flex-shrink-0">
                    <div className="flex flex-row lg:flex-col justify-center items-center">
                      {images
                        .filter((v, i) => i < 2)
                        .map((v, i) => (
                          <button
                            key={i}
                            type="button"
                            className={
                              v
                                ? "flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-4 text-center border-transparent"
                                : "hidden h-0"
                            }
                            onClick={() =>
                              setImages((prev) => [prev[0], prev[1], v])
                            }
                          >
                            <img
                              className="h-full w-full object-cover"
                              src={v}
                              alt=""
                            />
                          </button>
                        ))}
                    </div>
                  </div>

                  <div className="lg:ml-5 ">
                    <div className="max-w-xl overflow-hidden rounded-lg mx-auto">
                      <img
                        className={
                          images[2]
                            ? "h-64 w-auto max-w-full object-cover"
                            : "h-0 hidden"
                        }
                        src={images[2]}
                        alt="product-image"
                      />
                    </div>
                  </div>
                </div>
              )}
            </form>
          ) : null}
          {/* <!-- Modal footer --> */}
          <div className="flex items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <ButtonSecondary label="Cancel" onClick={handleClose} />
            {UIstate === "next" ? (
              <ButtonPrimary
                type="submit"
                label="Save Product"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              />
            ) : (
              <ButtonPrimary
                type="button"
                label="attach product images"
                onClick={handleNext}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
