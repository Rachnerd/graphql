import { ProductData } from "components/_mixins/product";
import { useState } from "react";
import "./App.css";
import { OvCardOverview } from "./ui-components/OvCardOverview";
import { OvCartProduct } from "./ui-components/OvCartProduct";
import { OvDefaultTemplate } from "./ui-components/OvDefaultTemplate";
import { OvProductInCart } from "./ui-components/OvProductInCart";
import { OvProductInStock } from "./ui-components/OvProductInStock";

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
  const [amounts, setAmounts] = useState<Record<string, number>>({});
  const [inCart, setInCart] = useState<Record<string, boolean>>({});

  return (
    <OvDefaultTemplate>
      <section slot="main">
        <h2>Products</h2>
        <OvCardOverview>
          {Array.from({ length: 6 }, (_, i) =>
            !inCart[i.toString()] ? (
              <OvProductInStock
                key={i.toString()}
                product={{
                  ...PRODUCT_MOCK,
                  id: i.toString(),
                }}
                amount={amounts[i.toString()] ?? 1}
                onIncrement={({ detail: { step } }) =>
                  setAmounts((amounts) => ({
                    ...amounts,
                    [i.toString()]: (amounts[i.toString()] ?? 1) + step,
                  }))
                }
                onDecrement={({ detail: { step } }) =>
                  setAmounts((amounts) => ({
                    ...amounts,
                    [i.toString()]: (amounts[i.toString()] ?? 1) - step,
                  }))
                }
                onAddToCart={({ detail: { id } }) =>
                  setInCart((inCart) => ({
                    ...inCart,
                    [id]: true,
                  }))
                }
              ></OvProductInStock>
            ) : (
              <OvProductInCart
                key={i.toString()}
                product={{
                  ...PRODUCT_MOCK,
                  id: i.toString(),
                }}
                onRemoveFromCart={() => {
                  setInCart((inCart) => ({
                    ...inCart,
                    [i.toString()]: false,
                  }));
                  setAmounts((amounts) => ({
                    ...amounts,
                    [i.toString()]: 1,
                  }));
                }}
              ></OvProductInCart>
            )
          )}
        </OvCardOverview>
      </section>

      <section slot="side">
        <h2>Cart</h2>
        <OvCardOverview>
          {Array.from({ length: 6 }, (_, i) => i)
            .filter((i) => inCart[i] ?? false)
            .map((i) => (
              <OvCartProduct
                product={{
                  image: PRODUCT_MOCK.image,
                  title: PRODUCT_MOCK.title,
                  price: PRODUCT_MOCK.price,
                }}
                amount={amounts[i.toString()] ?? 1}
                onRemoveFromCart={() => {
                  setInCart((inCart) => ({
                    ...inCart,
                    [i.toString()]: false,
                  }));
                  setAmounts((amounts) => ({
                    ...amounts,
                    [i.toString()]: 1,
                  }));
                }}
                onIncrement={({ detail: { step } }) =>
                  setAmounts((amounts) => ({
                    ...amounts,
                    [i.toString()]: (amounts[i.toString()] ?? 1) + step,
                  }))
                }
                onDecrement={({ detail: { step } }) =>
                  setAmounts((amounts) => ({
                    ...amounts,
                    [i.toString()]: (amounts[i.toString()] ?? 1) - step,
                  }))
                }
              ></OvCartProduct>
            ))}
        </OvCardOverview>
      </section>
    </OvDefaultTemplate>
  );
}

export default App;
