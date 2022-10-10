import { ProductData } from "components/_mixins/product";
import { useState } from "react";
import "./App.css";
import { OvCardOverview } from "./ui-components/OvCardOverview";
import { OvCartProduct } from "./ui-components/OvCartProduct";
import { OvDefaultTemplate } from "./ui-components/OvDefaultTemplate";
import { OvProductInCart } from "./ui-components/OvProductInCart";
import { OvProductInStock } from "./ui-components/OvProductInStock";

type HashMap<T> = Record<string, T>;

/**
 * Keeps track of the amount of each product in ProductsOverview -> Required UI state
 */
const useAmountsLocal = () => {
  const [amounts, setAmounts] = useState<HashMap<number>>({});

  const incrementAmount = (id: string, step: number) =>
    setAmounts((amounts) => ({
      ...amounts,
      [id]: (amounts[id] ?? 1) + step,
    }));

  const decrementAmount = (id: string, step: number) =>
    setAmounts((amounts) => ({
      ...amounts,
      [id]: (amounts[id] ?? 1) - step,
    }));

  return { amounts, incrementAmount, decrementAmount };
};

/**
 * Keeps track of the cart -> Temporary UI state
 */
const useCartLocal = () => {
  const [cart, setCart] = useState<HashMap<boolean>>({});

  const addToCart = (id: string) =>
    setCart((cart) => ({
      ...cart,
      [id]: true,
    }));

  const removeFromCart = (id: string) => {
    setCart((cart) => ({
      ...cart,
      [id]: false,
    }));
  };
  return { cart, addToCart, removeFromCart };
};

/**
 * Mock data -> Temporary
 */
const PRODUCT_MOCK: ProductData = {
  id: "1",
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: {
    rate: 3.9,
    count: 120,
  },
};

function App() {
  /**
   * Static data
   */
  const products = [
    PRODUCT_MOCK,
    PRODUCT_MOCK,
    PRODUCT_MOCK,
    PRODUCT_MOCK,
    PRODUCT_MOCK,
  ].map((product, i) => ({
    ...product,
    /**
     * Make sure each product has a unique ID
     */
    id: i.toString(),
  }));

  /**
   * UI state amount of each product (before added to the cart)
   */
  const { incrementAmount, decrementAmount, amounts } = useAmountsLocal();

  /**
   * Temporary cart logic
   */
  const { addToCart, removeFromCart, cart } = useCartLocal();

  /**
   *  Overview of products
   */
  const renderProductsOverview = () => (
    <>
      <h2>Products</h2>
      <OvCardOverview>
        {products!.map((product) =>
          !cart[product.id] ? (
            <OvProductInStock
              key={product.id}
              product={product}
              amount={amounts[product.id] ?? 1}
              onIncrement={({ detail: { step } }) =>
                incrementAmount(product.id, step)
              }
              onDecrement={({ detail: { step } }) =>
                decrementAmount(product.id, step)
              }
              onAddToCart={() => addToCart(product.id)}
            ></OvProductInStock>
          ) : (
            <OvProductInCart
              key={product.id}
              product={product}
              onRemoveFromCart={() => {
                removeFromCart(product.id);
              }}
            ></OvProductInCart>
          )
        )}
      </OvCardOverview>
    </>
  );

  /**
   *  Cart
   */
  const renderCart = () => (
    <>
      <OvCardOverview>
        {products
          .filter((product) => cart[product.id])!
          .map((product) => (
            <OvCartProduct
              key={product.id}
              product={product}
              amount={amounts[product.id] ?? 1}
              onRemoveFromCart={() => {
                removeFromCart(product.id);
              }}
              onIncrement={({ detail: { step } }) =>
                incrementAmount(product.id, step)
              }
              onDecrement={({ detail: { step } }) =>
                decrementAmount(product.id, step)
              }
            ></OvCartProduct>
          ))}
      </OvCardOverview>
    </>
  );

  return (
    <OvDefaultTemplate>
      <section slot="main">{renderProductsOverview()}</section>
      <section slot="side">{renderCart()}</section>
    </OvDefaultTemplate>
  );
}

export default App;
