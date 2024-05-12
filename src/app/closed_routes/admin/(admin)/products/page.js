"use client";
import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { ButtonSecondary } from "@/components/atoms/buttons";
import { ModalAddProduct } from "./compo";
import Loader from "@/components/loader";
import toast from "react-hot-toast";
import { numberWithCommas } from "@/helpers/formatters";
import { ProductsContext } from "@/app/closed_routes/(home)/context";

export default function ProductsPage() {
  const products = useContext(ProductsContext);
  // const [products, setProducts] = useState(null);
  const [activeModal, setModal] = useState("");
  const [loading, setLoading] = useState(true);
  const [itemClicked, setItemClicked] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  // onMount, fetch products
  useEffect(() => {
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
              <div className="relative w-full sm:max-w-[50%] min-w-[120px]"></div>
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
                              <Image
                                className="object-cover w-full h-full rounded-full"
                                src={v.images[0]}
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
                          {v.description?.map((v, i) => (
                            <p key={i} className="whitespace-no-wrap">
                              {Object.keys(v)} : {Object.values(v)}
                            </p>
                          ))}
                        </td>
                        <td className="px-5 py-5 text-sm">
                          <span className="relative inline-block font-semibold leading-tight">
                            {/* {parseInt(v.price) / 1000 + " K"} */}
                            {numberWithCommas(v.price)}
                          </span>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
          {activeModal === "add" && (
            <ModalAddProduct
              handleClose={() => {
                setModal("");
              }}
            />
          )}
          {/* {activeModal === "edit" && itemClicked && (
            <ModalEditProduct
              product={products.find((obj) => obj._id === itemClicked)}
              handleClose={() => {
                setItemClicked("");
                setModal("");
              }}
            />
          )} */}
        </>
      )}
    </div>
  );
}
