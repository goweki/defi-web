"use client";
import { ButtonPrimary } from "@/components/atoms/buttons";
import { useState } from "react";

export default function ContactsPage() {
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  return (
    <section>
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <p className="mb-8 lg:mb-16 font-light text-center sm:text-xl">
          Got an inquiry about our cars or services? Want to send feedback about
          our services? We would love to hear from you...
        </p>
        <form className="space-y-8">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="shadow bg-backg-surface text-sm rounded-lg block w-full p-2.5 dark:bg-backg-dark-surface"
              placeholder="email@defioffroads.com"
              required
              value={email}
              onChange={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="shadow bg-backg-surface text-sm rounded-lg block w-full p-2.5 dark:bg-backg-dark-surface"
              placeholder="Let us know how we can help"
              required
              value={subject}
              onChange={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSubject(e.target.value);
              }}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block mb-2 text-sm font-medium">
              Your message
            </label>
            <textarea
              id="message"
              rows="4"
              className="bg-backg-surface dark:bg-backg-dark-surface block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Leave an inquiry..."
              value={message}
              onChange={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMessage(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-row flex-1 justify-center">
            <ButtonPrimary label="Get in touch" />
          </div>
        </form>
      </div>
    </section>
  );
}
