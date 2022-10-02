import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../product/product";
import "../icon/icon";
import { ProductData } from "../product/product";

/**
 * @prop product
 * @attr amount
 */
@customElement("ov-product-in-cart")
export class ProductInCart extends LitElement {
  static styles = [
    css`
      section {
        text-align: right;
      }
    `,
  ];

  @property({ type: Object })
  product!: ProductData;

  @property({ type: Number })
  amount!: number;

  render() {
    return html`
      <ov-product .product=${this.product}>
        <section slot="actions">${this.amount} in cart</section>
      </ov-product>
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "ov-product-in-cart": ProductInCart;
  }
}
