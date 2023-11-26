"use client";
import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import heroImage from "@/assets/images/hero_image.png";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { CardLarge, CardProduct } from "@/components/cards";
import { ButtonPrimary, ButtonSecondary } from "@/components/atoms/buttons";
import { ProductsContext } from "./context";
import Loader from "@/components/loader";
import AutoPopUp from "./autoPopup";

export default function LandingPage() {
  const router = useRouter();
  const products = useContext(ProductsContext);
  const [showPopup, setShowPopup] = useState(false);
  // popup timer-20sec
  useEffect(() => {
    setTimeout(() => {
      setShowPopup(true);
    }, 20000);
  }, []);
  // render
  if (products)
    return (
      <>
        <Navbar />
        <main className="flex flex-col flex-1 w-full mb-12">
          {/* HERO */}
          <div className=" bg-backg-dark-surface dark:bg-backg-dark-raised p-6 sm:p-12 md:p-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:max-w-screen-lg m-auto">
              <div className="m-auto flex flex-col items-center">
                <h1 className="text-font-dark-focus mb-4 text-center">
                  Let&apos;s take it offroad
                </h1>
                <div className="inline-block">
                  <p className="text-font-dark inline-block">
                    What are you looking for?
                  </p>
                  <br />
                  <div className="space-x-6 my-2 inline-block">
                    <ButtonPrimary
                      label="A Car"
                      onClick={() => router.push("/cars")}
                    />
                    <ButtonSecondary
                      label="A Service"
                      className="text-font-dark hover:text-font"
                      onClick={() => router.push("/services")}
                    />
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <Image
                  src={heroImage}
                  priority={true}
                  width={720}
                  height={465}
                  alt="hero-image"
                />
              </div>
            </div>
          </div>
          {/* PICK of the Month */}

          {/* Top deals */}
          {/* <div className="w-full lg:max-w-screen-lg p-3 sm:p-4 mx-auto">
              <h2 className="pb-2"> Top deals</h2>
              <div className="flex flex-row w-full px-4 py-2 justify-start space-x-4 overflow-x-auto scrolling-touch">
                {products
                  .filter((obj) => obj.category === "Car")
                  .map((v, i) => {
                    return (
                      <CardLarge
                        product={v}
                        key={v._id}
                        id={v._id}
                        className={`inline-block`}
                      />
                    );
                  })}
              </div>
            </div> */}
          {/* Cars featured */}
          <div className="w-full lg:max-w-screen-lg p-3 sm:p-4 mx-auto">
            <h2 className="pb-2 text-center">Featured Cars</h2>
            <div className="flex flex-row w-full px-4 py-2 space-x-4 overflow-x-auto scrolling-touch justify-start">
              {products
                .filter((obj) => obj.category === "Car")
                .map((v, i) => {
                  return (
                    <CardProduct
                      product={v}
                      key={v._id}
                      id={v._id}
                      className={`inline-block`}
                    />
                  );
                })}
            </div>
          </div>
          {/* SERVICES featured */}
          <div className="w-full lg:max-w-screen-lg p-3 sm:p-4 mx-auto">
            <h2 className="pb-2 text-center">Featured Services</h2>
            <div className="flex flex-row w-full px-4 py-2 space-x-4 overflow-x-auto scrolling-touch justify-start">
              {products
                .filter((obj) => obj.category === "Service")
                .map((v, i) => {
                  return (
                    <CardProduct
                      product={v}
                      key={v._id}
                      id={v._id}
                      className={`inline-block`}
                    />
                  );
                })}
            </div>
          </div>

          {showPopup && <AutoPopUp handleClose={() => setShowPopup(false)} />}
        </main>
        <Footer />
      </>
    );
  else return <Loader />;
}
