import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "../product/product";
import "../../atoms/icon/icon";
import { MixinProduct } from "../../_mixins";

export type ProductInCartRemove = CustomEvent<void>;

/**
 * @prop product
 * @attr amount
 * @attr priceLoading
 */
@customElement("ov-product-in-cart")
export class ProductInCart extends MixinProduct(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }

      section {
        text-align: right;
      }

      ov-icon {
        cursor: pointer;
        --ov-icon-color: var(--color-primary);
      }

      .info {
        font-size: var(--font-xs);
      }

      ov-price {
        display: inline;
      }

      .container {
        display: inline-block;
      }
    `,
  ];

  private removeFromCart() {
    const event: ProductInCartRemove = new CustomEvent("remove-from-cart", {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <ov-product .product=${this.product} ?priceLoading=${this.priceLoading}>
        <section slot="actions">
          <ov-icon icon="trash" @click=${this.removeFromCart}></ov-icon>
          <span></span>
        </section>
      </ov-product>
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "ov-product-in-cart": ProductInCart;
  }
}
