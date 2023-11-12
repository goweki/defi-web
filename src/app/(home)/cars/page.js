"use client";
import { useContext, useState } from "react";
import { ButtonPrimary, ButtonSecondary } from "@/components/atoms/buttons";
import { ProductsContext } from "@/app/context";
import { CardLarge } from "@/components/cards";

export default function CarsPage() {
  const products = useContext(ProductsContext);
  const [clickedCar, setClickedCar] = useState("");
  // const [searchPhrase, setSearchPhrase] = useState("");
  // const [sizeFilter, setSizeFilter] = useState("");
  return (
    <div className="py-8 max-w-screen-lg w-full px-4 md:px-8 lg:px-12">
      {/* HEADER */}
      <div className="relative sm:rounded-lg">
        <div className="flex flex-col items-center justify-between p-4 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
          {/* search FIELD */}
          <div className="relative w-full sm:max-w-[50%] min-w-[120px]">
            <label
              htmlFor="searchPhrase"
              className="hidden mb-2 text-sm font-medium "
            >
              Search
            </label>
            <div className="flex absolute inset-y-0 left-0 items-center pl-3">
              {/* <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg> */}
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
              placeholder="Search cars by model..."
              type="searchPhrase"
              id="searchPhrase"
              required=""
            />
          </div>
          {/* filter FIELDS */}
          <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 sm:w-auto sm:flex-row sm:space-y-0 sm:items-center sm:space-x-3">
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
          </div>
        </div>
      </div>
      {/* product Cards */}
      <div className="flex flex-wrap p-4">
        {products &&
          products
            .filter((obj) => obj.category === "Car")
            .map((v, i) => {
              return (
                <CardLarge
                  // onClick={(e) => console.log(v._id)}
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Item clicked: " + v._id);
                    setClickedCar(v);
                  }}
                  product={v}
                  key={v._id}
                  inID={v._id}
                  className={`inline-block m-4`}
                />
              );
            })}
      </div>
      {clickedCar &&
        clickPopUp(function () {
          setClickedCar("");
        }, clickedCar)}
    </div>
  );
}

function clickPopUp(handleClose, car) {
  // ${showPopup ? "" : "hidden"}
  return (
    <div
      id="modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`transition fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full bg-backg dark:bg-backg-dark bg-opacity-90 dark:bg-opacity-90 flex items-center justify-center`}
    >
      <div className="relative w-full max-w-screen-lg max-h-full my-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-backg-surface rounded-lg shadow dark:bg-backg-dark-surface">
          {/* <!-- Modal header --> */}
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-font-inactive">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Interested in this {car.category} ?
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
          <div className="max-w-xl grid grid-cols-1 md:grid-cols-2 gap-x-4 m-auto h-fit pt-8">
            <div className="bg-primary m-auto w-full h-full">
              <canvas id="imgCanvas"></canvas>
            </div>
            <div className="bg-font-inactive">
              <h2 className="mb-4 text-xl text-center tracking-tight font-extrabold sm:text-2xl ">
                {car.name}
              </h2>
              <p className="text-center mb-4 font-light md:mb-8 sm:text-lg ">
                Leave your phone number or email below, so we can schedule a
                test-drive
              </p>
            </div>
          </div>
          {/* <!-- Modal footer --> */}
          <div className="flex items-center justify-center p-6 space-x-2 border-none  rounded-b">
            <ButtonSecondary label="Cancel" onClick={handleClose} />
            <ButtonPrimary label="Show Interest" onClick={handleClose} />
          </div>
        </div>
      </div>
    </div>
  );
}
