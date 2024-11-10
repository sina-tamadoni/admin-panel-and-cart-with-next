import { useCart } from "@/context/CartContext";
import React, { useState } from "react";

function Card({ product }) {
  const { name, price } = product;
  const [isInCart, setIsInCart] = useState(false);
  const [state, dispatch] = useCart();

  function addToCartHandler() {
    setIsInCart(true);
    dispatch({ type: "ADD", payload: product });
  }
  function removeFromCartHandler() {
    setIsInCart(false);
    dispatch({ type: "REMOVE", payload: product });
  }
  return (
    <div className="flex flex-col bg-white rounded-3xl w-[300px] shadow-lg ">
      <div className="px-6 py-8 sm:p-10 sm:pb-6">
        <div className="grid items-center justify-center w-full grid-cols-1 text-left">
          <div>
            <h2 className="font-medium text-gray-600 text-3xl">{name}</h2>
            <p className="mt-2 text-sm text-gray-500">
              Suitable to grow steadily.
            </p>
          </div>
          <div className="mt-6">
            <p>
              <span className="text-5xl font-light tracking-tight text-black">
                {price}
              </span>
              <span className="text-base font-medium text-gray-500">
                {" "}
                /تومان{" "}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex px-6 pb-8 sm:px-8">
        {isInCart ? (
          <button
            className="flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-blue-900 border-2 border-blue-900 rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
            onClick={removeFromCartHandler}
          >
            حذف از سبد خرید
          </button>
        ) : (
          <button
            className="flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-blue-900 border-2 border-blue-900 rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
            onClick={addToCartHandler}
          >
            افزودن به سبد خرید
          </button>
        )}
      </div>
    </div>
  );
}

export default Card;
