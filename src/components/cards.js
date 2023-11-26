import Image from "next/image";
import carImage from "@/assets/images/car.jpg";
import { ButtonSecondary } from "./atoms/buttons";

export function CardLarge({
  className,
  product,
  onClick = () => console.log("Card clicked"),
}) {
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
      <div className="p-4 pt-2 w-full">
        <h3 className="text-lg font-semibold truncate">{product?.name}</h3>
        <p className="text-xs truncate">{product?.description}</p>
      </div>
    </div>
  );
}

export function CardProduct({
  className,
  product,
  onClick = () => console.log("Card clicked"),
}) {
  return (
    <div className="group relative h-84 w-52 m-1 md:m-2 lg:m-4 flex flex-col shrink-0 overflow-hidden rounded-lg bg-backg-surface dark:bg-backg-dark-surface hover:bg-primary-light dark:hover:bg-primary-dark shadow hover:scale-105 hover:shadow-lg cursor-pointer transition">
      <div className="relative flex w-full overflow-hidden">
        <Image
          className={`object-cover h-full w-full group-hover:scale-110 transition`}
          src={product?.image}
          width={300}
          height={300}
          alt="car_image"
        />
        <span
          className={`bg-state-success text-font-dark-focus absolute top-0 left-0 m-2 rounded-full px-2 text-center text-sm font-medium text-white`}
        >
          available
        </span>
      </div>
      <div className="mt-4 px-2 pb-3 group-hover:text-font-focus dark:group-hover:text-font-dark-focus flex flex-col flex-1 justify-between">
        <h5 className="md:text-lg tracking-tight text-center truncate">
          {product?.name}
        </h5>
        <div className="mt-2 mb-4 flex items-center justify-center">
          <p>
            <span className="md:text-xl font-bold">
              <span className="text-sm uppercase">Ksh. </span>
              {product?.price.toString().length > 6
                ? Math.ceil(product?.price / 1000000) + "M"
                : Math.ceil(product?.price / 1000) + "K"}{" "}
            </span>
            {/* <span className="text-sm text-slate-900 line-through">$699</span> */}
          </p>
        </div>
        {/* <a
          href="#"
          className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to cart
        </a> */}
      </div>
    </div>
  );
}

export function CardInFooter({
  title,
  desc,
  btnText,
  onClick = () => console.log("Card button clicked"),
}) {
  return (
    <div className="max-w-md flex flex-col items-start justify-start bg-gradientCard dark:bg-gradientCardDark rounded-lg p-6 m-3">
      <h4 className="mb-2 font-bold uppercase">{title}</h4>
      <div className="flex flex-wrap sm:flex-nowrap">
        <div className="max-h-20 mr-4 overflow-hidden">{desc}</div>
        <ButtonSecondary
          label={btnText}
          onClick={onClick}
          className="ml-auto h-16 w-28"
        />
      </div>
    </div>
  );
}
