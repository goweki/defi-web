import { CardProduct } from "@/components/cards";

export default function ProductSection({ category, products }) {
  //render
  return (
    <div className="w-full lg:max-w-screen-lg p-3 sm:p-4 mx-auto">
      <h2 className="py-2 text-center uppercase">{category + "S"}</h2>
      <div
        className={`flex flex-row w-full px-4 py-2 overflow-x-auto scrolling-touch ${
          products.length < 4 ? "justify-center" : "justify-start"
        }`}
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
