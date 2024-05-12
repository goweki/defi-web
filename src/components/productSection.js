import { CardProduct } from "@/components/cards";

export default function ProductSection({ title, products }) {
  //render
  return (
    <div className="animate-up-in w-full lg:max-w-screen-lg p-3 sm:p-4 mx-auto">
      <h2 className="pt-2 text-center uppercase">{title}</h2>
      <div
        className={`flex flex-row w-full px-4 overflow-x-auto scrolling-touch`}
      >
        {products.map((v, i) => {
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
  );
}
