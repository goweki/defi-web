import Navbar from "@/components/navbar";
import Image from "next/image";
import heroImage from "@/assets/images/hero_image.png";
import { CardLarge } from "@/components/cards";
import { ButtonPrimary, ButtonSecondary } from "@/components/atoms/buttons";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-1 w-full mb-12">
        {/* HERO */}
        <div className=" bg-backg-dark-surface dark:bg-backg-dark-raised p-6 sm:p-12 md:p-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:max-w-screen-lg m-auto">
            <div className="m-auto flex flex-col items-center">
              <h1 className="text-font-dark-focus mb-4 text-center">
                Where offroads come alive
              </h1>
              <div className="inline-block">
                <p className="text-font-dark inline-block">
                  What are you looking for?
                </p>
                <br />
                <div className="space-x-6 my-2 inline-block">
                  <ButtonPrimary label="Cars" />
                  <ButtonSecondary label="Service" />
                </div>
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
        {/* PICK of the Month */}
        <div className="lg:max-w-screen-lg p-3 sm:p-4 mx-auto">
          <h2 className="pb-2">Pick of the Month</h2>
          <div className="flex flex-row justify-between space-x-4">
            <CardLarge className={`inline-block`} />
            <CardLarge className={`hidden sm:inline-block`} />
            <CardLarge className={`hidden md:inline-block`} />
            <CardLarge className={`hidden lg:inline-block`} />
          </div>
        </div>
        {/* CARS featured */}
        <div className="lg:max-w-screen-lg p-3 sm:p-4 mx-auto">
          <h2 className="pb-2">Featured Cars</h2>
          <div className="flex flex-row justify-between space-x-4">
            <CardLarge className={`inline-block`} />
            <CardLarge className={`hidden sm:inline-block`} />
            <CardLarge className={`hidden md:inline-block`} />
            <CardLarge className={`hidden lg:inline-block`} />
          </div>
        </div>
        {/* SERVICES featured */}
        <div className="lg:max-w-screen-lg p-3 sm:p-4 mx-auto">
          <h2 className="pb-2">Featured Services</h2>
          <div className="flex flex-row justify-between space-x-4">
            <CardLarge className={`inline-block`} />
            <CardLarge className={`hidden sm:inline-block`} />
            <CardLarge className={`hidden md:inline-block`} />
            <CardLarge className={`hidden lg:inline-block`} />
          </div>
        </div>
      </main>
    </>
  );
}

const data = [
  {
    name: "VW GTI MK5",
    image:
      "https://img.freepik.com/icones-gratuites/photo_318-224222.jpg?t=st=1692184185~exp=1692184785~hmac=9574e270a720386c1cab75eb8df937f8a31e20fbfcfebe219b3c4dd3705bc975",
    comment: `you can add text with html tag <b>like this   </b>`,
  },
  {
    link: "add link here",
    image:
      "https://img.freepik.com/icones-gratuites/photo_318-224222.jpg?t=st=1692184185~exp=1692184785~hmac=9574e270a720386c1cab75eb8df937f8a31e20fbfcfebe219b3c4dd3705bc975",
    comment: `you can add text with html tag <b>like this   </b>`,
  },
  {
    link: "add link here",
    image:
      "https://img.freepik.com/icones-gratuites/photo_318-224222.jpg?t=st=1692184185~exp=1692184785~hmac=9574e270a720386c1cab75eb8df937f8a31e20fbfcfebe219b3c4dd3705bc975",
    comment: `you can add text with html tag <b>like this   </b>`,
  },
  {
    link: "add link here",
    image:
      "https://img.freepik.com/icones-gratuites/photo_318-224222.jpg?t=st=1692184185~exp=1692184785~hmac=9574e270a720386c1cab75eb8df937f8a31e20fbfcfebe219b3c4dd3705bc975",
    comment: `you can add text with html tag <b>like this   </b>`,
  },
  {
    link: "add link here",
    image:
      "https://img.freepik.com/icones-gratuites/photo_318-224222.jpg?t=st=1692184185~exp=1692184785~hmac=9574e270a720386c1cab75eb8df937f8a31e20fbfcfebe219b3c4dd3705bc975",
    comment: `you can add text with html tag <b>like this   </b>`,
  },
  {
    link: "add link here",
    image:
      "https://img.freepik.com/icones-gratuites/photo_318-224222.jpg?t=st=1692184185~exp=1692184785~hmac=9574e270a720386c1cab75eb8df937f8a31e20fbfcfebe219b3c4dd3705bc975",
    comment: `you can add text with html tag <b>like this   </b>`,
  },
];
