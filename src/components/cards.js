import Image from "next/image";
import carImage from "@/assets/images/car.jpg";
import { ButtonSecondary } from "./atoms/buttons";

export function CardLarge({ className, product, onClick = () => null }) {
  return (
    <div
      onClick={onClick}
      className={`${className} group flex-none w-52 h-84 bg-backg-surface dark:bg-backg-dark-surface overflow-hidden rounded-xl shadow hover:shadow-lg hover:scale-105 transition`}
    >
      <div className="w-52 aspect-square overflow-hidden">
        <Image
          className={`object-cover transition group-hover:scale-110`}
          src={product?.image}
          width={300}
          height={300}
          alt="car_image"
        />
      </div>
      <div className="p-4 w-full">
        <h3 className="text-xl font-bold ">{product?.name}</h3>
        <p className="font-serif">{product?.description}</p>
      </div>
    </div>
  );
}

export function CardInFooter({ title, desc, btnText }) {
  return (
    <div className="max-w-md flex flex-col items-start justify-start bg-gradientCard dark:bg-gradientCardDark rounded-lg p-6 m-3">
      <h4 className="mb-2 font-bold uppercase">{title}</h4>
      <div className="flex flex-wrap sm:flex-nowrap">
        <div className="max-h-20 mr-4 overflow-hidden">{desc}</div>
        <ButtonSecondary label={btnText} className="ml-auto h-16 w-28" />
      </div>
    </div>
  );
}
