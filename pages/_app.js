import CartProvider from "@/context/CartContext";
import QueryProvider from "@/providers/QueryProvider";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <QueryProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
      <Toaster />
    </QueryProvider>
  );
}
