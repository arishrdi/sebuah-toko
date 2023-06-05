import { type Product } from "@prisma/client";
import { create } from "zustand";

export type IProduct = {
  quantity?: number;
} & Product;

interface State {
  carts: IProduct[];
  totalItem: number;
  totalPrice: number;
}

interface Action {
  addToCart: (product: IProduct) => void;
  decreaseCart: (product: IProduct) => void;
}

const INITIAL_STATE: State = {
  carts: [],
  totalItem: 0,
  totalPrice: 0,
};

export const useCartProduct = create<State & Action>((set, get) => ({
  carts: INITIAL_STATE.carts,
  totalItem: INITIAL_STATE.totalItem,
  totalPrice: INITIAL_STATE.totalPrice,
  addToCart: (product) => {
    const cart = get().carts;
    const isItemExist = cart.find((item) => item.id === product.id);

    if (isItemExist) {
      const newCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity as number) + 1 }
          : item
      );
      set((state) => ({
        carts: newCart,
        totalItem: state.totalItem + 1,
        totalPrice: state.totalPrice + product.price,
      }));
    } else {
      const newCart = [...cart, { ...product, quantity: 1 }];
      set((state) => ({
        carts: newCart,
        totalItem: state.totalItem + 1,
        totalPrice: state.totalPrice + product.price,
      }));
    }
  },
  decreaseCart: (product) => {
    const cart = get().carts;
    const indexCart = cart.findIndex((item) => item.id === product.id);
    let newCart = cart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: (item.quantity as number) - 1 }
        : item
    );
    const emptyCart = (cart[indexCart]?.quantity as number) <= 1;
    if (emptyCart) {
      newCart = cart.filter((item) => item.id !== product.id);
    }
    set((state) => ({
      carts: newCart,
      totalItem: state.totalItem - 1,
      totalPrice: state.totalPrice - product.price,
    }));
  },
}));
