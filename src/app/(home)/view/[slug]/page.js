"use client";
import { useState, useEffect, useContext } from "react";
import { ProductsContext } from "@/app/(home)/context";
import Link from "next/link";
import Image from "next/image";
import { ButtonPrimary, ButtonSecondary } from "@/components/atoms/buttons";

export default function PoductItem({ params }) {
  const products = useContext(ProductsContext);
  const [productItem, setProductItem] = useState("");

  useEffect(() => {
    setProductItem(products.find(({ _id }) => _id === params.slug));
  }, [products, params.slug]);

  return productItem ? (
    <div id="productView">
      <div className="max-w-screen-lg max-h-full my-4 bg-backg-surface dark:bg-backg-dark-surface">
        <div className="relative rounded-lg shadow ">
          {/* <!-- heading --> */}
          <div className="flex items-start justify-center p-4 border-b rounded-t dark:border-font-inactive">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Interested in this {productItem.category} ?
            </h3>
          </div>
          {/* <!-- body - GRID --> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 content-center">
            <div className="p-8 md:pl-16 lg:pl-24 m-auto">
              <p className="mx-auto mb-4 font-light sm:text-lg text-center">
                <span className="block font-bold text-2xl mb-4">
                  {" "}
                  {productItem.name}
                </span>
                <span>description</span>
                {[
                  { "Sample field": " Lorem Ipsum the Ipsum is for 1" },
                  { "Sample field": " Lorem Ipsum the Ipsum is for 2" },
                  { "Sample field": " Lorem Ipsum the Ipsum is for 3" },
                ].map((v, i) => (
                  <span key={i} className="block text-sm">
                    {Object.keys(v)} : {Object.values(v)}
                  </span>
                ))}
              </p>

              <div className="flex flex-row justify-center my-6">
                <ButtonSecondary
                  label="Call Defi"
                  onClick={() => "Call Defi"}
                  className="mr-8"
                />
                <ButtonPrimary
                  label="Order via Whatsapp"
                  onClick={() => "Order via Whatsapp"}
                />
              </div>
            </div>
            <div className="hidden md:flex md:h-[360px] aspect-square p-8 md:pr-8 lg:pr-12">
              <Image
                className="my-auto"
                src={productItem.image}
                width={500}
                height={500}
                alt="product image"
              />
            </div>
          </div>
          {/* <!-- Modal footer --> */}
          {/* <div className="flex items-center justify-center p-6 space-x-2 border-none  rounded-b">
              <ButtonSecondary label="Cancel" onClick={handleClose} />
              <ButtonPrimary label="Show Interest" onClick={handleClose} />
            </div> */}
        </div>
      </div>
    </div>
  ) : (
    <p className="my-6">
      The product was not found.{" "}
      <Link href="/" className="text-primary-dark dark:text-primary">
        Click here
      </Link>{" "}
      to go back to home
    </p>
  );
}
