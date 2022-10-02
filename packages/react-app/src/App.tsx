import { ProductData } from "components/product/product";
import { useState } from "react";
import "./App.css";
import { OvProductInCart } from "./ui-components/OvProductInCart";
import { OvProductInStock } from "./ui-components/OvProductInStock";

const PRODUCT_MOCK: ProductData = {
  id: "1",
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  subtitle: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: {
    rate: 3.9,
    count: 120,
  },
};

function App() {
  const [cartInfo, setCartInfo] = useState<{
    id: string;
    amount: number;
  } | null>(null);
  return cartInfo === null ? (
    <OvProductInStock
      product={PRODUCT_MOCK}
      amount={1}
      onAddToCart={({ detail: cartInfo }) => setCartInfo(cartInfo)}
    ></OvProductInStock>
  ) : (
    <OvProductInCart
      product={PRODUCT_MOCK}
      amount={cartInfo.amount}
    ></OvProductInCart>
  );
}

export default App;
