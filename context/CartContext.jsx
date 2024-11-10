import { sumProducts } from "@/helpers/helper";
import { createContext, useContext, useReducer } from "react";

const initialState = {
  selectedProducts: [],
  productsQuantity: 0,
  totalPrice: 0,
  chekout: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const findedProduct = state.selectedProducts.find(
        (product) => product.id === action.payload.id
      );
      if (!findedProduct) {
        state.selectedProducts.push({ ...action.payload, quantity: 1 });
      }
      return {
        selectedProducts: [...state.selectedProducts],
        ...sumProducts(state.selectedProducts),
        checkout: false,
      };
    case "REMOVE":
      const filteredProducts = state.selectedProducts.filter(
        (product) => product.id !== action.payload.id
      );
      return {
        selectedProducts: [...filteredProducts],
        ...sumProducts(filteredProducts),
        checkout: false,
      };
    case "INCREASE":
      const indexOfProduct = state.selectedProducts.findIndex(
        (product) => product.id === action.payload.id
      );
      state.selectedProducts[indexOfProduct].quantity++;
      return {
        ...state,
        ...sumProducts(state.selectedProducts),
      };
    case "DECREASE":
      const indexOfSelectedProduct = state.selectedProducts.findIndex(
        (product) => product.id === action.payload.id
      );
      state.selectedProducts[indexOfSelectedProduct].quantity--;
      return {
        ...state,
        ...sumProducts(state.selectedProducts),
      };
    case "CHECKOUT":
      return {
        selectedProducts: [],
        productsQuantity: 0,
        totalPrice: 0,
        chekout: true,
      };
    default:
      throw new Error("Invalid Action");
  }
};
const CartContext = createContext();

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

const useCart = () => {
  const { state, dispatch } = useContext(CartContext);
  return [state, dispatch];
};

export default CartProvider;
export { useCart };
