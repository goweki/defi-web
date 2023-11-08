"use client";
import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { ButtonSecondary } from "@/components/atoms/buttons";
import { ModalAddProduct } from "./modal";
import { ProductsContext } from "@/app/context";
import Loader from "@/components/loader";

export default function InventoryPage() {
  const products = useContext(ProductsContext);
  const [showModal, setShowModal] = useState(false);
  const [randomNo, setRandomNo] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="py-8 max-w-screen-lg w-full px-4 md:px-8 lg:px-12">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between p-2 space-x-2 space-y-2">
            <select className="h-full rounded-lg border-none max-w-120 pb-2 px-2 bg-backg-raised dark:bg-backg-dark-raised">
              <option value="" defaultValue>
                All
              </option>
              <option>Cars</option>
              <option>Parts</option>
              <option>Services</option>
            </select>
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 "
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="block p-2 pl-10 text-sm border-none rounded-lg w-max-60 bg-backg-raised dark:bg-backg-dark-raised"
                placeholder="Search for items"
              />
            </div>
            <div>
              <ButtonSecondary
                className="text-sm"
                label="New Product"
                onClick={() => {
                  console.log(" > Button clicked to show inventory modal...");
                  setShowModal(true);
                }}
              />
            </div>
          </div>
          <div className="w-full shadow rounded-lg overflow-x-auto bg-backg-surface dark:bg-backg-dark-surface">
            <table className="min-w-full leading-normal">
              <thead className="bg-backg-raised dark:bg-backg-dark-raised">
                <tr className="border-b-2 border-backg-dark-raised ">
                  <th className="px-5 py-3  text-left text-xs font-semibold uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold  uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold  uppercase tracking-wider">
                    Properties
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold  uppercase tracking-wider">
                    {"Price (Ksh.)"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-font-inactive dark:divide-font-dark-inactive border-none">
                {products &&
                  products.map((v, i) => (
                    <tr
                      key={v._id}
                      className="border-b border-font-inactive dark:border-font-dark-inactive hover:bg-backg dark:hover:bg-backg-dark-raised cursor-pointer"
                    >
                      <td className="px-5 py-5 text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            {/* <img
                          className="w-full h-full rounded-full"
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                          alt=""
                        /> */}
                            <Image
                              className="w-full h-full rounded-full"
                              src={v.image}
                              width={512}
                              height={512}
                              alt="img"
                            />
                          </div>
                          <div className="ml-3">
                            <p className="whitespace-no-wrap">{v.name}</p>
                            {/* <p>{Buffer(v.image).toString("base64")}</p> */}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{v.category}</p>
                      </td>
                      <td className="px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{v.description}</p>
                      </td>
                      <td className="px-5 py-5 text-sm">
                        <span className="relative inline-block font-semibold leading-tight">
                          {parseInt(v.price) / 1000 + " K"}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {products && (
              <div className="px-5 py-5 border-none flex flex-col xs:flex-row items-center xs:justify-between          ">
                <span className="text-xs xs:text-sm">
                  Showing {1} to {products.length < 20 ? products.length : ""}{" "}
                  of {products.length} Entries
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button className="m-1 hover:bg-gradientBtnHover hover:text-font-focus text-sm border border-primary-dark font-semibold py-2 px-4 rounded-l">
                    Prev
                  </button>
                  <button className="m-1 hover:bg-gradientBtnHover hover:text-font-focus text-sm border border-primary-dark font-semibold py-2 px-4 rounded-r">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
          <ModalAddProduct
            key={randomNo}
            isVisible={showModal}
            // reset={() => setRandomNo(Math.floor(Math.random() * 100))}
            handleClose={() => {
              setShowModal(false);
              setRandomNo(Math.floor(Math.random() * 100));
            }}
          />
        </>
      )}
    </div>
  );
}
