import { gql } from "@apollo/client";
import { useState } from "react";
import "./App.css";
import {
  CartDocument,
  useAddToCartMutation,
  useCartQuery,
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

const useAmountsLocal = () => {
  const [amounts, setAmounts] = useState<Record<string, number>>({});

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
  const { loading: productsLoading, data: products } =
    useProductsWithoutPricesQuery({
      variables: {
        pagination: {
          page: 1,
          size: 6,
        },
      },
    });

  const { data: productsPrices } = useProductsPricesQuery({
    variables: {
      pagination: {
        page: 1,
        size: 6,
      },
    },
  });

  const { incrementAmount, decrementAmount, amounts } = useAmountsLocal();

  const [addToCart] = useAddToCartMutation({
    refetchQueries: [CartDocument],

    optimisticResponse: {
      __typename: "Mutation",
      addToCart: true,
    },
    update: (proxy, _, { variables }) => {
      const { addToCartId } = variables!;
      proxy.writeFragment({
        id: proxy.identify({ id: addToCartId, __typename: "Product" }),
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
    refetchQueries: [CartDocument],
    optimisticResponse: {
      __typename: "Mutation",
      removeFromCart: true,
    },
    update: (proxy, _, { variables }) => {
      const { removeFromCartId } = variables!;
      proxy.writeFragment({
        id: proxy.identify({ id: removeFromCartId, __typename: "Product" }),
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

  const { loading: cartLoading, data: cartData } = useCartQuery();

  return (
    <OvDefaultTemplate>
      <section slot="main">
        <h2>Products</h2>
        {productsLoading ? (
          <>Loading</>
        ) : (
          <OvCardOverview>
            {products?.products.results?.map((product, i) =>
              !product.inCart ? (
                <OvProductInStock
                  key={product.id}
                  product={{
                    ...product,
                    price:
                      productsPrices?.products.results[i].price ?? undefined,
                  }}
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
                  product={{
                    ...product,
                    price:
                      productsPrices?.products.results[i].price ?? undefined,
                  }}
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
        )}
      </section>

      <section slot="side">
        <h2>Cart</h2>
        {cartLoading ? (
          <>Loading</>
        ) : (
          <OvCardOverview>
            {cartData?.cart.products.map(({ quantity, product }) => (
              <OvCartProduct
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
        )}
      </section>
    </OvDefaultTemplate>
  );
}

export default App;
