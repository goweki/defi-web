"use client";
import { useContext, useState, useEffect } from "react";
import { ProductsContext } from "@/app/context";
import { CardProduct } from "@/components/cards";
import Loader from "@/components/loader";
import { AccessoryPopup } from "./accessoryPopup";

export default function AccessoriesPage() {
  const products = useContext(ProductsContext);
  const [accessories, setAccessories] = useState("");
  const [clickedAccessory, setClickedAccessory] = useState("");
  const [searchPhrase, setSearchPhrase] = useState("");
  // const [sizeFilter, setSizeFilter] = useState("");
  // setCars: onMount, on-Products, on-searchPhrase

  useEffect(() => {
    setAccessories(
      products
        ?.filter(({ category }) => category.toLowerCase() === "accessory")
        .filter(({ name }) =>
          name.toLowerCase().includes(searchPhrase.toLowerCase())
        )
    );
  }, [products, searchPhrase]);
  if (accessories)
    return (
      <div className="py-8 max-w-screen-lg w-full px-3 md:px-6">
        {/* HEADER */}
        <div className="relative sm:rounded-lg">
          <div className="flex flex-col items-center justify-center p-4 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
            {/* search FIELD */}
            <div className="relative w-full sm:max-w-[50%] min-w-[120px]">
              <label
                htmlFor="searchPhrase"
                className="hidden mb-2 text-sm font-medium "
              >
                Search
              </label>
              <div className="flex absolute inset-y-0 left-0 items-center pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
              <input
                className="block p-2 pl-10 w-full border bg-backg-raised rounded-lg dark:bg-backg-dark-raised"
                // className="rounded-lg w-full min-w-[240px] bg-backg-raised dark:bg-backg-dark-raised"
                placeholder="Search accessories..."
                type="searchPhrase"
                id="searchPhrase"
                value={searchPhrase}
                onChange={(e) => {
                  e.preventDefault();
                  setSearchPhrase(e.target.value);
                }}
              />
            </div>
            {/* filter FIELDS */}
            {/* <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 sm:w-auto sm:flex-row sm:space-y-0 sm:items-center sm:space-x-3">
              <div className="flex items-center w-full space-x-3 md:w-auto">
                <select
                  name="model"
                  className="flex w-full min-w-[120px] rounded-lg border pb-2 px-2 bg-backg-raised dark:bg-backg-dark-raised"
                >
                  <option value="" defaultValue className="italic py-2">
                    model...
                  </option>
                  <option>Ford</option>
                  <option>Subaru</option>
                  <option>Toyota</option>
                </select>
                <select
                  name="size"
                  className="flex w-full min-w-[120px] rounded-lg border pb-2 px-2 bg-backg-raised dark:bg-backg-dark-raised"
                >
                  <option value="" defaultValue className="italic py-2">
                    size...
                  </option>
                  <option>Large</option>
                  <option>Medium</option>
                  <option>Small</option>
                </select>
              </div>
            </div> */}
          </div>
        </div>
        {/* product Cards */}
        <div className="flex flex-wrap justify-center">
          {accessories.map((v, i) => {
            return (
              <div key={v._id}>
                <CardProduct
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Item clicked: " + v._id);
                    setClickedAccessory(v);
                  }}
                  product={v}
                  className={`inline-block`}
                />
              </div>
            );
          })}
        </div>
        {clickedAccessory && (
          <AccessoryPopup
            handleClose={() => setClickedAccessory("")}
            car={clickedAccessory}
          />
        )}
      </div>
    );
  else return <Loader />;
}
