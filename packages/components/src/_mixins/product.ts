import { LitElement } from "lit";
import { property } from "lit/decorators.js";
import { Constructor } from "./constructor";

export interface RatingData {
  rate: number;
  count: number;
}

export interface ProductData {
  id: string;
  title: string;
  price: number;
  description: string;
  subtitle: string;
  image: string;
  rating: RatingData;
}

export interface ProductInterface {
  product: ProductData;
  priceLoading: boolean;
}

export const MixinProduct = <T extends Constructor<LitElement>>(
  superClass: T
) => {
  class MixinProductClass extends superClass {
    @property({ type: Object })
    product!: ProductData;

    @property({ type: Boolean })
    priceLoading?: boolean = false;
  }
  return MixinProductClass as Constructor<ProductInterface> & T;
};
