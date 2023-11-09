"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ButtonSecondary } from "@/components/atoms/buttons";
import { ModalAddProduct, ModalEditProduct, ProductOptions } from "./compo";
import { ProductsContext } from "@/app/context";
import Loader from "@/components/loader";
import toast from "react-hot-toast";

export default function InventoryPage() {
  const router = useRouter();
  const [products, setProducts] = useState(null);
  const [activeModal, setModal] = useState("");
  const [loading, setLoading] = useState(true);
  const [itemClicked, setItemClicked] = useState("");
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
      setLoading(false);
    }
  }, [activeModal]);
  // render
  return (
    <div className="py-8 max-w-screen-lg w-full px-4 md:px-8 lg:px-12">
      {loading || !products ? (
        <Loader />
      ) : (
        <>
          {itemClicked && <ProductOptions options={itemClicked} />}
          <div className="flex flex-wrap items-center justify-between p-2 space-x-2 space-y-2">
            <select
              name="category"
              className="h-full rounded-lg border-none max-w-120 pb-2 px-2 bg-backg-raised dark:bg-backg-dark-raised"
            >
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
                onClick={(e) => {
                  e.preventDefault();
                  console.log(" > Button clicked to show Add-Product-Modal...");
                  setModal("add");
                }}
              />
            </div>
          </div>
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
                  products.map((v, i) => (
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
                          {parseInt(v.price) / 1000 + " K"}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {products?.length > 50 && (
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
