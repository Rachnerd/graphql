import { gql } from "@apollo/client";
import { useState } from "react";
import "./App.css";
import {
  CartWithoutPricesDocument,
  useAddToCartMutation,
  useCartPricesQuery,
  useCartWithoutPricesQuery,
  useProductsPricesQuery,
  useProductsWithoutPricesQuery,
  useRemoveFromCartMutation,
  useUpdateCartMutation,
} from "./generated/graphql";
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

function App() {
  const { loading: productsLoading, data: productsQuery } =
    useProductsWithoutPricesQuery({
      variables: {
        pagination: {
          page: 1,
          size: 6,
        },
      },
    });

  const products = productsQuery?.products.results;

  const { data: productPricesQuery } = useProductsPricesQuery({
    variables: {
      pagination: {
        page: 1,
        size: 6,
      },
    },
  });

  const productPrices = productPricesQuery?.products.results;

  const { loading: cartLoading, data: cartQuery } = useCartWithoutPricesQuery();
  const cartProducts = cartQuery?.cart.products;

  const { data: cartPricesQuery } = useCartPricesQuery();
  const cartWithPrices = cartPricesQuery?.cart.products;

  /**
   * UI state amount of each product (before added to the cart)
   */
  const { incrementAmount, decrementAmount, amounts } = useAmountsLocal();

  const [addToCart] = useAddToCartMutation({
    refetchQueries: [CartWithoutPricesDocument],
    optimisticResponse: {
      __typename: "Mutation",
      addToCart: true,
    },
    update: (cache, _, { variables }) => {
      const { addToCartId } = variables!;
      cache.writeFragment({
        id: cache.identify({ id: addToCartId, __typename: "Product" }),
        fragment: gql`
          fragment ProductInCart on Product {
            inCart
          }
        `,
        data: {
          __typename: "Product",
          inCart: true,
        },
      });
    },
  });

  const [removeFromCart] = useRemoveFromCartMutation({
    refetchQueries: [CartWithoutPricesDocument],
    optimisticResponse: {
      __typename: "Mutation",
      removeFromCart: true,
    },
    update: (cache, _, { variables }) => {
      const { removeFromCartId } = variables!;
      cache.writeFragment({
        id: cache.identify({ id: removeFromCartId, __typename: "Product" }),
        fragment: gql`
          fragment ProductInCart on Product {
            inCart
          }
        `,
        data: {
          __typename: "Product",
          inCart: false,
        },
      });
    },
  });

  const [updateCart] = useUpdateCartMutation({
    optimisticResponse: {
      __typename: "Mutation",
      updateCart: true,
    },
    update: (proxy, _, { variables }) => {
      const { updateCartId, quantity } = variables!;
      proxy.writeFragment({
        id: proxy.identify({ id: updateCartId, __typename: "CartProduct" }),
        fragment: gql`
          fragment CartProductAmount on CartProduct {
            quantity
          }
        `,
        data: {
          __typename: "CartProduct",
          quantity,
        },
      });
    },
  });

  /**
   *  Overview of products
   */
  const renderProductsOverview = () => (
    <>
      <h2>Products</h2>
      <OvCardOverview>
        {products!
          .map((product, i) => ({
            ...product,
            price: productPrices?.[i]?.price,
          }))
          .map((product) =>
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
                onAddToCart={() =>
                  addToCart({
                    variables: {
                      addToCartId: product.id,
                      quantity: amounts[product.id] ?? 1,
                    },
                  })
                }
              ></OvProductInStock>
            ) : (
              <OvProductInCart
                key={product.id}
                product={product}
                onRemoveFromCart={() => {
                  removeFromCart({
                    variables: {
                      removeFromCartId: product.id,
                    },
                  });
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
        {cartProducts!
          .map((cartProduct, i) => ({
            ...cartProduct,
            product: {
              ...cartProduct.product,
              price: cartWithPrices?.[i].product.price,
            },
          }))
          .map(({ product, quantity }) => (
            <OvCartProduct
              key={product.id}
              product={product}
              amount={quantity}
              onRemoveFromCart={() => {
                removeFromCart({
                  variables: {
                    removeFromCartId: product.id,
                  },
                });
              }}
              onIncrement={({ detail: { step } }) =>
                updateCart({
                  variables: {
                    updateCartId: product.id,
                    quantity: quantity + step,
                  },
                })
              }
              onDecrement={({ detail: { step } }) =>
                updateCart({
                  variables: {
                    updateCartId: product.id,
                    quantity: quantity - step,
                  },
                })
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
