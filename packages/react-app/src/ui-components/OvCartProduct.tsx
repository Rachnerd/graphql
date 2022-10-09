import { ProductInCartRemove } from "components/molecules/product-in-cart/product-in-cart";
import { createComponent } from "@lit-labs/react";
import React from "react";
import type { EventName } from "@lit-labs/react";
import {
  DecrementEvent,
  IncrementEvent,
} from "components/molecules/quantity/quantity";
import { CartProduct } from "components/molecules/cart-product/cart-product";

export const OvCartProduct = createComponent(
  React,
  "ov-cart-product",
  CartProduct,
  {
    onRemoveFromCart: "remove-from-cart" as EventName<ProductInCartRemove>,
    onIncrement: "increment" as EventName<IncrementEvent>,
    onDecrement: "decrement" as EventName<DecrementEvent>,
  }
);
