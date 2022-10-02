import {
  ProductInStock,
  AddToCartEvent,
} from "components/product-in-stock/product-in-stock";
import { createComponent } from "@lit-labs/react";
import React from "react";
import type { EventName } from "@lit-labs/react";

export const OvProductInStock = createComponent(
  React,
  "ov-product-in-stock",
  ProductInStock,
  {
    onAddToCart: "add-to-cart" as EventName<AddToCartEvent>,
  }
);
