import Image from "next/image";
import heroImage from "@/assets/images/hero_image.png";
export default function CarsPageAdmin() {
  return (
    <div className="py-8">
      {/* <div>
      <h3 className="text-center">Products</h3>
      </div> */}
      <div className="my-2 flex sm:flex-row flex-col sm:justify-center">
        <div className="flex flex-row mb-1 sm:mb-0">
          <div className="relative">
            <select className="h-full rounded border block w-full border-font-inactive py-2 px-4 pr-8 leading-tight focus:outline-none">
              <option>5</option>
              <option>10</option>
              <option>20</option>
            </select>
          </div>
          <div className="relative">
            <select className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block w-full py-2 px-4 pr-8 leading-tight ">
              <option>All</option>
              <option>Cars</option>
              <option>Parts</option>
              <option>Services</option>
            </select>
          </div>
        </div>
        <div className="block relative">
          <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current ">
              <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
            </svg>
          </span>
          <input
            placeholder="Search"
            className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-font-inactive border-b block pl-8 pr-6 py-2 w-full text-sm focus:outline-none "
          />
        </div>
      </div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block max-w-screen-lg shadow rounded-lg overflow-hidden bg-backg-surface dark:bg-backg-dark-surface">
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
                  Description
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold  uppercase tracking-wider">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-font-inactive dark:divide-font-dark-inactive border-none">
              <tr className="border-b border-font-inactive dark:border-font-dark-inactive hover:bg-backg dark:hover:bg-backg-dark">
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
                        src={heroImage}
                        width={720}
                        height={620}
                        alt="hero-image"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">
                        VW GTI MK5
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 text-sm">
                  <p className="whitespace-no-wrap">Cars</p>
                </td>
                <td className="px-5 py-5 text-sm">
                  <p className="whitespace-no-wrap">2016, 2000cc</p>
                </td>
                <td className="px-5 py-5 text-sm">
                  <span className="relative inline-block px-3 py-1 font-semibold leading-tight">
                    700k
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="px-5 py-5 border-none flex flex-col xs:flex-row items-center xs:justify-between          ">
            <span className="text-xs xs:text-sm">
              Showing 1 to 4 of 50 Entries
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
        </div>
      </div>
    </div>
  );
}
