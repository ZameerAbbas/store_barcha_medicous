import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store/index";
import Navbar from "../component/navbar";
import Footerpage from "../component/Footer";
import { CartProvider } from "../context/CartContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>

      <Provider store={store}>
        <Navbar />

        <Component {...pageProps} />
        <Footerpage />

      </Provider>
    </CartProvider>
  );
}
