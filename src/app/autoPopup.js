import { ButtonPrimary, ButtonSecondary } from "@/components/atoms/buttons";
import { useState } from "react";

export default function AutoPopUp({ handleClose }) {
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    //setLoading(true);
    // confirm fields filled
    if (!email || !category) {
      setError(`Fill empty fields`);
      return;
    }
    // fetch options
    let fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        email,
        category,
        message,
      }),
    };
    // PUT request using fetch
    fetch("/api/mailer", fetchOptions)
      .then((res_) => res_.json())
      .then((json_) => {
        if (json_.success) {
          console.log(
            "SUCCESS: email sent\n > " +
              JSON.stringify(json_) +
              "\n.............."
          );
          toast.success("Info submitted!");
          handleClose();
        } else if (json_.error) {
          console.error(
            "ERROR: failed sending email\n > " +
              JSON.stringify(json_) +
              "\n.............."
          );
          toast.error(json_.error);
        } else {
          console.error(
            "ERROR: failed sending email\n > " +
              JSON.stringify(json_) +
              "\n.............."
          );
          toast.error("No Response");
        }
      })
      .catch((err) => {
        toast.error("ERROR: failed to send info");
        console.error("ERROR: caught error -autopopup\n > " + err.error || err);
      });
  }

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
              Hi there
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
          <section>
            <div className="p-4 mx-auto max-w-screen-lg lg:py-8 lg:px-6">
              <div className="mx-auto max-w-screen-md sm:text-center">
                <h2 className="mb-4 text-3xl tracking-tight font-extrabold sm:text-4xl ">
                  Need help?
                </h2>
                <p className="mx-auto mb-4 font-light md:mb-8 sm:text-lg ">
                  Please tell us what you are looking for and we will follow up
                  in the coming days to ensure you got the assistance you need.
                </p>
                <form>
                  <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-x-2 sm:space-y-0">
                    <div className="relative w-full">
                      <label
                        htmlFor="category"
                        className="hidden mb-2 text-sm font-medium"
                      >
                        Category
                      </label>
                      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>

                      <select
                        name="categories"
                        id="categories"
                        className="block p-3 pl-10 w-full text-sm bg-backg-raised rounded-lg border border-font-inactive sm:rounded-none dark:bg-backg-dark-raised"
                        value={category}
                        onChange={(e) => {
                          e.preventDefault();
                          setCategory(e.target.value);
                        }}
                      >
                        <option value="Cars">Cars</option>
                        <option value="Services">Services</option>
                      </select>
                    </div>
                    <div className="relative w-full">
                      <label
                        htmlFor="email"
                        className="hidden mb-2 text-sm font-medium "
                      >
                        Email address
                      </label>
                      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                        </svg>
                      </div>
                      <input
                        className="block p-3 pl-10 w-full text-sm bg-backg-raised rounded-lg border border-font-inactive sm:rounded-none dark:bg-backg-dark-raised"
                        placeholder="Enter your email"
                        type="email"
                        id="email"
                        required=""
                        value={email}
                        onChange={(e) => {
                          e.preventDefault();
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="mx-auto max-w-screen-sm text-sm text-left">
                    We care about privacy and never share information with third
                    parties
                    {/* <a
                      href="#"
                      className="font-medium text-primary-600 dark:text-primary-500 hover:underline"
                    >
                      Read our Privacy Policy
                    </a> */}
                    .
                  </div>
                  <div className="items-center mx-auto my-3 max-w-screen-sm">
                    <div className="relative w-full">
                      <label
                        htmlFor="category"
                        className="hidden mb-2 text-sm font-medium"
                      >
                        Description
                      </label>
                      {/* <input
                        className="block p-3 pl-10 w-full text-sm bg-backg-raised dark:bg-backg-dark-raised rounded-lg border border-font-inactive"
                        placeholder="Message (Optional)"
                        type="text"
                        id="description"
                        required=""
                      /> */}
                      <textarea
                        id="message"
                        rows="2"
                        className="block p-3 w-full text-sm bg-backg-raised dark:bg-backg-dark-raised rounded-lg border border-font-inactive "
                        placeholder="Message (Optional)"
                        value={message}
                        onChange={(e) => {
                          e.preventDefault();
                          setMessage(e.target.value);
                        }}
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
          {/* <!-- Modal footer --> */}
          <div className="flex items-center justify-end p-6 space-x-2 border-none  rounded-b">
            <ButtonSecondary label="Cancel" onClick={handleClose} />
            <ButtonPrimary label="Show Interest" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
