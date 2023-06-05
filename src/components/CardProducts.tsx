import { useSession } from "next-auth/react";
import { CldImage } from "next-cloudinary";
import React from "react";
import { useCartProduct } from "~/hooks/cartStore";
import { api } from "~/utils/api";
import { USDollar } from "~/utils/currencies";
import SearchForm from "./SearchForm";

const CardProducts = () => {
  const { data: sessionData } = useSession();
  const { data: products, isLoading } = api.product.getAllProduct.useQuery({
    userId: sessionData?.user.id as string,
  });

  const { addToCart, carts } = useCartProduct();

  console.log("Carts => ", carts);

  if (isLoading) {
    return <p>Loading.....</p>;
  }

  return (
    <div>
      <SearchForm />
      <div className="mx-2 mt-5 grid grid-cols-3 gap-10">
        {products?.map((product) => {
          return (
            <div key={product.id} onClick={() => addToCart(product)}>
              {product.image && (
                <CldImage
                  src={product.image}
                  alt="Gambarr"
                  width={200}
                  height={200}
                  className="cursor-pointer rounded-2xl transition-all duration-300  hover:scale-105 hover:shadow-2xl w-60 h-40 object-cover "
                />
              )}
              <p className="text-lg font-bold">{product.name}</p>
              <p className="font-bold text-orange-500">
                {USDollar.format(product.price)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardProducts;
