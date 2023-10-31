"use client";
import { ButtonPrimary, ButtonSecondary } from "@/components/atoms/buttons";

export function InventoryModal({ isVisible, handleClose }) {
  return (
    <div
      id="modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`${
        isVisible ? "" : "hidden"
      } fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-backg dark:bg-backg-dark bg-opacity-90 flex items-center justify-center`}
    >
      <div className="relative w-full max-w-screen-lg max-h-full my-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-backg-surface rounded-lg shadow dark:bg-backg-dark-surface">
          {/* <!-- Modal header --> */}
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Product
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
          <form className="flex flex-col justify-center p-4 sm:p-8 lg:p-12">
            <div className="relative flex items-center mb-2 w-full after:absolute after:right-3 after:border-black/70 after:border-b after:border-r after:transform after:rotate-45 after:h-[8px] after:w-[8px]">
              <select
                name="category"
                required
                className="w-full px-3 py-2 text-black transition-all border border-gray-200 rounded-md outline-blue-600/50 appearance-none bg-white cursor-pointer hover:border-blue-600/30 invalid:text-gray-400"
              >
                <option value="" disabled selected>
                  Product category
                </option>
                <option value="option-1">Car</option>
                <option value="option-2">Part</option>
                <option value="option-3">Service</option>
              </select>
            </div>
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="w-full px-3 py-2 mb-2 transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30"
            />
            <input
              name="email"
              type="text"
              placeholder="Email"
              className="w-full px-3 py-2 mb-2 transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30"
            />
            <textarea
              name="message"
              id=""
              cols="30"
              rows="5"
              placeholder="Message"
              className="w-full px-3 py-2 mb-2 resize-none transition-all border border-gray-200 rounded-md outline-blue-600/50 hover:border-blue-600/30"
            ></textarea>
            <div className="upload-container relative flex items-center justify-between w-full">
              <div className="drop-area w-full rounded-md border-2 border-dotted border-gray-200 transition-all hover:border-blue-600/30 text-center">
                <label
                  for="file-input"
                  className="block w-full h-full text-gray-500 p-4 text-sm cursor-pointer"
                >
                  Drop your image here or click to browse
                </label>
                <input
                  name="file"
                  type="file"
                  id="file-input"
                  accept="image/*"
                  className="hidden"
                />
                {/* <!-- Image upload input --> */}
                <div className="preview-container hidden items-center justify-center flex-col">
                  <div className="preview-image w-36 h-36 bg-cover bg-center rounded-md"></div>
                  <span className="file-name my-4 text-sm font-medium"></span>
                  <p className="close-button cursor-pointer transition-all mb-4 rounded-md px-3 py-1 border text-xs text-red-500 border-red-500 hover:bg-red-500 hover:text-white">
                    Delete
                  </p>
                </div>
              </div>
            </div>
          </form>
          {/* <!-- Modal footer --> */}
          <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <ButtonSecondary label="Cancel" />
            <ButtonPrimary label="Save" />
          </div>
        </div>
      </div>
    </div>
  );
}
