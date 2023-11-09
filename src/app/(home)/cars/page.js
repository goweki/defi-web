"use client";
import { useContext } from "react";
import { ButtonSecondary } from "@/components/atoms/buttons";
import { ProductsContext } from "@/app/context";

export default function CarsPage() {
  const products = useContext(ProductsContext);
  return (
    <div className="py-8 max-w-screen-lg w-full px-4 md:px-8 lg:px-12">
      {/* HEADER */}
      <div className="relative sm:rounded-lg">
        <div className="flex flex-col items-center justify-between p-4 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
          {/* search FIELD */}
          <div className="w-full sm:max-w-[50%]">
            <input
              placeholder="search vehicles"
              className="rounded-lg w-full min-w-[240px] bg-backg-raised dark:bg-backg-dark-raised"
            />
          </div>
          {/* filter FIELDS */}
          <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 sm:w-auto sm:flex-row sm:space-y-0 sm:items-center sm:space-x-3">
            <div className="flex items-center w-full space-x-3 md:w-auto">
              <select
                name="model"
                className="flex w-full min-w-[120px] rounded-lg border pb-2 px-2 bg-backg-raised dark:bg-backg-dark-raised"
              >
                <option value="" disabled selected className="italic">
                  model
                </option>
                <option>Ford</option>
                <option>Subaru</option>
                <option>Toyota</option>
              </select>
              <select
                name="size"
                className="flex w-full min-w-[120px] rounded-lg border pb-2 px-2 bg-backg-raised dark:bg-backg-dark-raised"
              >
                <option value="" disabled selected className="italic">
                  size
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
    </div>
  );
}
