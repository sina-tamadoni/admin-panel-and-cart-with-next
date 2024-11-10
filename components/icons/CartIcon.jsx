import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { IconContext } from "react-icons";
import { CiShoppingCart } from "react-icons/ci";

function CartIcon() {
  const [state] = useCart();
  const { productsQuantity } = state;

  return (
    <Link href="/cart">
      <div className="relative">
        <div className="text-4xl md:text-5xl">
          <CiShoppingCart />
        </div>
        <div className="absolute top-0.5 left-6 md:left-8 text-white font-mono text-xs md:text-base bg-red-500 w-2 h-2 p-2 md:p-3 flex items-center justify-center rounded-full">
          {productsQuantity}
        </div>
      </div>
    </Link>
  );
}

export default CartIcon;
