import TrashIcon from "../icons/TrashIcon";
import { FaCircleMinus, FaCirclePlus, FaTrash } from "react-icons/fa6";

function CartCard({ product, dispatch }) {
  const { name, price, quantity } = product;

  return (
    <tr className="text-left border-b-2 mt-2">
      <td className="h-[100px] align-middle p-3 text-center">
        <h3 className="w-12 md:w-full text-xl md:text-3xl text-left overflow-hidden whitespace-nowrap text-ellipsis">
          {name}
        </h3>
      </td>
      <td
        title={`${price} تومان`}
        className="text-xl h-[100px] align-middle p-3 text-center overflow-hidden whitespace-nowrap text-ellipsis"
      >
        {price} تومان
      </td>
      <td className="text-xl h-[100px] align-middle text-center">
        <div className="flex justify-center items-center gap-1 md:gap-3">
          {quantity > 1 ? (
            <FaCircleMinus
              fontSize={20}
              className="text-blue-700 cursor-pointer"
              onClick={() => dispatch({ type: "DECREASE", payload: product })}
            />
          ) : (
            <FaTrash
              fontSize={18}
              className="text-red-600 cursor-pointer"
              onClick={() => dispatch({ type: "REMOVE", payload: product })}
            />
          )}
          <span className="font-semibold">{quantity}</span>
          <FaCirclePlus
            fontSize={20}
            className="text-blue-700 cursor-pointer"
            onClick={() => dispatch({ type: "INCREASE", payload: product })}
          />
        </div>
      </td>
      <td
        title={`${price * quantity} تومان`}
        className="text-xl h-[100px] align-middle p-3 text-center overflow-hidden whitespace-nowrap text-ellipsis"
      >
        {price * quantity} تومان
      </td>
    </tr>
  );
}

export default CartCard;
