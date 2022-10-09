import {
  ProductInCart,
  ProductInCartRemove,
} from "components/molecules/product-in-cart/product-in-cart";
import { createComponent } from "@lit-labs/react";
import React from "react";
import type { EventName } from "@lit-labs/react";

export const OvProductInCart = createComponent(
  React,
  "ov-product-in-cart",
  ProductInCart,
  {
    onRemoveFromCart: "remove-from-cart" as EventName<ProductInCartRemove>,
  }
);
