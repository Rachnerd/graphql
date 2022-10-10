import { useState } from "react";
import "./App.css";
import { useCartQuery, useProductsQuery } from "./generated/graphql";
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

function App() {
  const { loading: productsLoading, data: productsQuery } = useProductsQuery({
    variables: {
      pagination: {
        page: 1,
        size: 6,
      },
    },
  });

  const products = productsQuery?.products.results;

  /**
   * UI state amount of each product (before added to the cart)
   */
  const { incrementAmount, decrementAmount, amounts } = useAmountsLocal();

  /**
   * Temporary cart logic
   */
  const { addToCart, removeFromCart } = useCartLocal();

  const { loading: cartLoading, data: cartQuery } = useCartQuery();
  const cartProducts = cartQuery?.cart.products;

  /**
   *  Overview of products
   */
  const renderProductsOverview = () => (
    <>
      <h2>Products</h2>
      <OvCardOverview>
        {products!.map((product, i) =>
          !product.inCart ? (
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
        {cartProducts!.map(({ product }) => (
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
      <section slot="main">
        {productsLoading ? <p>Loading products</p> : renderProductsOverview()}
      </section>
      <section slot="side">
        {cartLoading ? <p>Loading</p> : renderCart()}
      </section>
    </OvDefaultTemplate>
  );
}

export default App;
