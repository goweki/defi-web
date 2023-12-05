"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ButtonSecondary } from "@/components/atoms/buttons";
import { ModalAddProduct, ModalEditProduct } from "./compo";
import Loader from "@/components/loader";
import toast from "react-hot-toast";

export default function ProductsPage() {
  const [products, setProducts] = useState(null);
  const [activeModal, setModal] = useState("");
  const [loading, setLoading] = useState(true);
  const [itemClicked, setItemClicked] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  // onMount, fetch products
  useEffect(() => {
    if (!activeModal) {
      const fetchOptions = { method: "GET" };
      fetch("/api/products", fetchOptions)
        .then((res_) => res_.json())
        .then((json_) => {
          if (json_.success) {
            console.log(
              `SUCCESS: Documents fetched:${json_.success.length}\n.............`
            );
            setProducts(json_.success);
          } else if (json_.error) {
            console.error(
              "ERROR: could not fetch products\n > " +
                JSON.stringify(json_.error) +
                "\n.............."
            );
            toast.error(json_.error);
          } else {
            console.error(
              "ERROR: Loading products failed\n > " +
                JSON.stringify(json_) +
                "\n.............."
            );
            toast.error("ERROR: Check network and reload");
          }
        })
        .catch((err) => {
          toast.error("ERROR: operations failed");
          console.error("ERROR: caught error\n > " + err.error || err);
        });
    }
    setLoading(false);
  }, [activeModal]);
  // render
  return (
    <div className="py-8 max-w-screen-lg w-full px-4 md:px-8 lg:px-12">
      {loading || !products ? (
        <Loader />
      ) : (
        <>
          {/* HEADER */}
          <div className="relative sm:rounded-lg">
            <div className="flex flex-col items-center justify-between p-4 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              {/* search FIELD */}
              <div className="relative w-full sm:max-w-[50%] min-w-[120px]">
                {/* <label
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
                  placeholder="Search products by name..."
                  type="searchPhrase"
                  id="searchPhrase"
                  required=""
                  value={searchPhrase}
                  onChange={(e) => {
                    e.preventDefault();
                    setSearchPhrase(e.target.value);
                  }}
                /> */}
              </div>
              {/* filter FIELDS */}
              <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 sm:w-auto sm:flex-row sm:space-y-0 sm:items-center sm:space-x-3">
                <div className="flex items-center w-full space-x-3 md:w-auto">
                  <select
                    name="category"
                    className="flex w-full min-w-[160px] rounded-lg border border-font-inactive focus:border-transparent focus:ring-primary bg-backg-raised pb-2 px-2 dark:bg-backg-dark-raised outline-none placeholder:italic py-3"
                    value={filterCategory}
                    onChange={(e) => {
                      setFilterCategory(e.target.value);
                    }}
                  >
                    <option value="" defaultValue>
                      All Categories
                    </option>
                    <option value="car">Cars</option>
                    <option value="service">Services</option>
                    <option value="part">Part</option>
                    <option value="accessory">Accessory</option>
                  </select>
                  <ButtonSecondary
                    className="flex w-full min-w-[120px] pb-2 px-2 text-sm"
                    label="New Product"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(
                        " > Button clicked to show Add-Product-Modal..."
                      );
                      setModal("add");
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* table */}
          <div className="w-full shadow rounded-lg overflow-x-auto bg-backg-surface dark:bg-backg-dark-surface">
            <table className="min-w-full leading-normal">
              <thead className="bg-backg-raised dark:bg-backg-dark-raised">
                <tr className="border-b-2 border-backg-dark-raised ">
                  <th className="px-5 py-3  text-left text-xs font-semibold uppercase tracking-wider">
                    Products {` (${products?.length})`}
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
                  products
                    .filter((item) => {
                      if (filterCategory) {
                        return item.category.toLowerCase() === filterCategory;
                      } else {
                        return true;
                      }
                    })
                    .map((v, i) => (
                      <tr
                        id={v._id}
                        key={v._id}
                        className="border-b border-font-inactive dark:border-font-dark-inactive hover:bg-backg dark:hover:bg-backg-dark-raised cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          setItemClicked(e.currentTarget.id);
                          setModal("edit");
                        }}
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
                            {/* {parseInt(v.price) / 1000 + " K"} */}
                            {v.price.toString().length > 6
                              ? (v.price / 1000000).toFixed(2) + "M"
                              : (v.price / 1000).toFixed(2) + "K"}{" "}
                          </span>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
            {/* {products?.length > 50 && (
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
            )} */}
          </div>
          {activeModal === "add" && (
            <ModalAddProduct
              handleClose={() => {
                setModal("");
              }}
            />
          )}
          {activeModal === "edit" && itemClicked && (
            <ModalEditProduct
              product={products.find((obj) => obj._id === itemClicked)}
              handleClose={() => {
                setItemClicked("");
                setModal("");
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
