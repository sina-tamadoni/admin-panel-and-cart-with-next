import { useCart } from "@/context/CartContext";
import React from "react";
import CartCard from "../modules/CartCard";

function CartPage() {
  const [state, dispatch] = useCart();
  const { selectedProducts, totalPrice } = state;

  return (
    <div className="bg-[#eff3f6] rounded-xl p-4 overflow-auto">
      {selectedProducts.length ? (
        <table className="w-full bg-white rounded-xl shadow-lg table-fixed border-collapse">
          <thead>
            <tr className="text-center md:text-2xl">
              <th className="p-3 text-left">نام محصول</th>
              <th className=" p-3">قیمت</th>
              <th className=" p-3">تعداد</th>
              <th className=" p-3">مجموع</th>
            </tr>
          </thead>
          <tbody>
            {selectedProducts.map((product) => (
              <CartCard
                key={product.id}
                product={product}
                dispatch={dispatch}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <h2 className="text-center font-semibold">سبد خرید شما خالی است</h2>
      )}
    </div>
  );
}

export default CartPage;
