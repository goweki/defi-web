"use client";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { ProductsContext } from "./context";
import Loader from "@/components/loader";
import AutoPopUp from "./autoPopup";
import ProductSection from "@/components/productSection";

export default function LandingPage() {
  const router = useRouter();
  const products = useContext(ProductsContext);
  const [showPopup, setShowPopup] = useState(false);
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
        {/* CARS */}
        {products.filter((obj) => obj.category.toLowerCase() === "car").length >
          0 && (
          <ProductSection
            category="car"
            products={products.filter(
              (obj) => obj.category.toLowerCase() === "car"
            )}
          />
        )}
        {/* PARTS */}
        {products.filter((obj) => obj.category.toLowerCase() === "part")
          .length > 0 && (
          <ProductSection
            category="part"
            products={products.filter(
              (obj) => obj.category.toLowerCase() === "part"
            )}
          />
        )}
        {/* SERVICES */}
        {products.filter((obj) => obj.category.toLowerCase() === "service")
          .length > 0 && (
          <ProductSection
            category="service"
            products={products.filter(
              (obj) => obj.category.toLowerCase() === "service"
            )}
          />
        )}
        {/* ACCESSORIES */}
        {products.filter((obj) => obj.category.toLowerCase() === "accessory")
          .length > 0 && (
          <ProductSection
            category="accessory"
            products={products.filter(
              (obj) => obj.category.toLowerCase() === "accessory"
            )}
          />
        )}
        {showPopup && <AutoPopUp handleClose={() => setShowPopup(false)} />}
      </>
    );
  else return <Loader />;
}
