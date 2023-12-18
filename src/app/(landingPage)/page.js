"use client";
import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import heroImage from "@/assets/images/hero_image.png";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { CardLarge, CardProduct } from "@/components/cards";
import { ButtonPrimary, ButtonSecondary } from "@/components/atoms/buttons";
import { ProductsContext } from "../context";
import Loader from "@/components/loader";
import AutoPopUp from "./autoPopup";
import { ProductPopup } from "./productPopup";

export default function LandingPage() {
  const router = useRouter();
  const products = useContext(ProductsContext);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  // popup timer-20sec
  useEffect(() => {
    setTimeout(() => {
      setShowPopup(true);
    }, 10000);
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
                  <div className="space-x-6 my-2 inline-block justify-center">
                    <ButtonPrimary
                      label="Car"
                      onClick={() => router.push("/cars")}
                    />
                    <ButtonSecondary
                      label="Service"
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
          {/* CARS */}
          {products.filter((obj) => obj.category.toLowerCase() === "car")
            .length > 0 && (
            <div className="w-full lg:max-w-screen-lg p-3 sm:p-4 mx-auto">
              <h2 className="pb-2 text-center">CARS</h2>
              <div
                className={`flex flex-row w-full px-4 py-2 overflow-x-auto scrolling-touch ${
                  products.filter((obj) => obj.category.toLowerCase() === "car")
                    .length < 4
                    ? "justify-center"
                    : "justify-start"
                }`}
              >
                {products
                  .filter((obj) => obj.category.toLowerCase() === "car")
                  .map((v, i) => {
                    return (
                      <CardProduct
                        product={v}
                        key={v._id}
                        id={v._id}
                        className={`inline-block`}
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedProduct(v);
                        }}
                      />
                    );
                  })}
              </div>
            </div>
          )}
          {/* PARTS */}
          {products.filter((obj) => obj.category.toLowerCase() === "part")
            .length > 0 && (
            <div className="w-full lg:max-w-screen-lg p-3 sm:p-4 mx-auto">
              <h2 className="pb-2 text-center">PARTS</h2>
              <div
                className={`flex flex-row w-full px-4 py-2 overflow-x-auto scrolling-touch ${
                  products.filter(
                    (obj) => obj.category.toLowerCase() === "part"
                  ).length < 4
                    ? "justify-center"
                    : "justify-start"
                }`}
              >
                {products
                  .filter((obj) => obj.category.toLowerCase() === "part")
                  .map((v, i) => {
                    return (
                      <CardProduct
                        product={v}
                        key={v._id}
                        id={v._id}
                        className={`inline-block`}
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedProduct(v);
                        }}
                      />
                    );
                  })}
              </div>
            </div>
          )}
          {/* SERVICES */}
          {products.filter((obj) => obj.category.toLowerCase() === "service")
            .length > 0 && (
            <div className="w-full lg:max-w-screen-lg p-3 sm:p-4 mx-auto">
              <h2 className="pb-2 text-center">SERVICES</h2>
              <div
                className={`flex flex-row w-full px-4 py-2 overflow-x-auto scrolling-touch ${
                  products.filter(
                    (obj) => obj.category.toLowerCase() === "service"
                  ).length < 4
                    ? "justify-center"
                    : "justify-start"
                }`}
              >
                {products
                  .filter((obj) => obj.category.toLowerCase() === "service")
                  .map((v, i) => {
                    return (
                      <CardProduct
                        product={v}
                        key={v._id}
                        id={v._id}
                        className={`inline-block`}
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedProduct(v);
                        }}
                      />
                    );
                  })}
              </div>
            </div>
          )}
          {/* ACCESSORIES */}
          {products.filter((obj) => obj.category.toLowerCase() === "accessory")
            .length > 0 && (
            <div className="w-full lg:max-w-screen-lg p-3 sm:p-4 mx-auto">
              <h2 className="pb-2 text-center uppercase">Accessories</h2>
              <div
                className={`flex flex-row w-full px-4 py-2 overflow-x-auto scrolling-touch ${
                  products.filter(
                    (obj) => obj.category.toLowerCase() === "accessory"
                  ).length < 4
                    ? "justify-center"
                    : "justify-start"
                }`}
              >
                {products
                  .filter((obj) => obj.category.toLowerCase() === "accessory")
                  .map((v, i) => {
                    return (
                      <CardProduct
                        product={v}
                        key={v._id}
                        id={v._id}
                        className={`inline-block`}
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedProduct(v);
                        }}
                      />
                    );
                  })}
              </div>
            </div>
          )}
          {selectedProduct && (
            <ProductPopup
              handleClose={() => setSelectedProduct("")}
              product={selectedProduct}
            />
          )}
          {showPopup && <AutoPopUp handleClose={() => setShowPopup(false)} />}
        </main>
        <Footer />
      </>
    );
  else return <Loader />;
}
