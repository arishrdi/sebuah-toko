import React from "react";
import Navbar from "./Navbar";
import { useCartProduct } from "~/hooks/cartStore";
import { CldImage } from "next-cloudinary";
import { USDollar } from "~/utils/currencies";
import Button from "./inputs/Button";
import Modal from "./Modal";
import { api } from "~/utils/api";

const CartItems = () => {
  const { carts, totalItem, totalPrice, addToCart, decreaseCart } =
    useCartProduct();
  const createCart = api.cart.postCarts.useMutation();
  const cartHandle = () => {
    carts.map((cart) => {
      return createCart.mutate({
        // every cart when mutate, have the same id, I'll fix it later
        productId: cart.id,
        quantity: cart.quantity as number,
      });
    });
  };
  return (
    <div>
      <Navbar />
      <div className="flex h-[65vh] w-full flex-col gap-3 overflow-scroll">
        {carts.map((product) => {
          return (
            <div
              key={product.id}
              className="flex w-full items-center justify-between gap-5 rounded-lg border p-3"
            >
              {product.image && (
                <CldImage
                  src={product.image}
                  alt="Product"
                  width={50}
                  height={50}
                  className="rounded-lg"
                />
              )}
              <div className="flex-1">
                <p className="font-bold">{product.name}</p>
                <p className="text-orange-500">
                  {USDollar.format(product.price)}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  label="-"
                  size="small"
                  onCLick={() => decreaseCart(product)}
                />
                {product.quantity}
                <Button
                  label="+"
                  size="small"
                  onCLick={() => addToCart(product)}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <p>Total Item: {totalItem}</p>
        <p>Total Price: {USDollar.format(totalPrice)}</p>
        <Modal
          trigger={<Button label="Place Order" onCLick={cartHandle} className="w-full" />}
          actionTrigger={<Button label="Place Order" />}
        >
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            deserunt incidunt non? Quibusdam, modi! Natus exercitationem
            laboriosam eius nobis, nam placeat doloremque corporis minus dolores
            voluptatum nihil autem animi? Dignissimos!
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CartItems;
