import Image from "next/image";
import carImage from "@/assets/images/car.jpg";
import { ButtonSecondary } from "./atoms/buttons";

export function CardLarge({ className }) {
  return (
    <div
      className={`${className} group bg-backg-surface dark:bg-backg-dark-surface overflow-hidden rounded-xl shadow hover:shadow-md`}
    >
      <div className="max-h-64 aspect-square overflow-hidden">
        <Image
          className={`object-cover transition group-hover:scale-110`}
          src={carImage}
          width={300}
          height={300}
          alt="car_image"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold">VW GOLF GTI</h3>
        <p className="font-serif">2019, 1600cc, 26000km</p>
      </div>
    </div>
  );
}

export function CardInFooter({ title, desc, btnText }) {
  return (
    <div className="max-w-md flex flex-col items-start justify-start bg-gradientCard rounded-lg p-6 m-3">
      <h4 className="mb-2 font-bold uppercase">{title}</h4>
      <div className="flex flex-wrap sm:flex-nowrap">
        <div className="max-h-20 mr-4 overflow-hidden">{desc}</div>
        <ButtonSecondary
          label={btnText}
          className="ml-auto h-16 w-28 text-font-focus"
        />
      </div>
    </div>
  );
}
