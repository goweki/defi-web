import Navbar from "@/components/navbar";
import Image from "next/image";
import heroImage from "@/assets/images/hero_image.png";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-1 w-full">
        <div className=" bg-backg-dark-surface dark:bg-backg-dark-raised p-6 sm:p-12 md:p-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:max-w-screen-lg m-auto">
            <div className="m-auto">
              <h1 className="text-font-dark-focus mb-3">
                Where cars <span className="whitespace-pre">come alive</span>
              </h1>
              <p className="text-font-dark">What are you looking for?</p>
              <div className="space-x-4">
                <button className="bg-gradientBtn hover:bg-gradientBtnHover hover:scale-105 font-semibold text-font py-2 px-4 border border-transparent rounded hover:shadow hover:shadow-primary-light/90 dark:hover:shadow-primary-light/40">
                  Button1
                </button>
                <button className="bg-transparent hover:bg-gradientBtnHover hover:scale-105 font-semibold text-font-dark hover:text-font py-2 px-4 border border-primary rounded hover:shadow hover:shadow-primary-light/90 dark:hover:shadow-primary-light/40">
                  Button2
                </button>
              </div>
            </div>
            <div className="hidden sm:block">
              <Image
                src={heroImage}
                width={720}
                height={395}
                alt="hero-image"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
