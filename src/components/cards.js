import Image from "next/image";
import carImage from "@/assets/images/car.jpg";
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
