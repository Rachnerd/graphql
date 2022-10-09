import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../product/product";
import "../quantity/quantity";
import "../../atoms/icon/icon";
import { MixinProduct } from "../../_mixins/product";

export type AddToCartEvent = CustomEvent<{ id: string; amount: number }>;

/**
 * @prop product
 * @attr amount
 * @attr priceLoading
 */
@customElement("ov-product-in-stock")
export class ProductInStock extends MixinProduct(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }

      section[slot="actions"] {
        display: flex;
        justify-content: flex-end;
        padding-right: 8px;
        align-items: center;
        gap: 4px;
      }

      @media (max-width: 767px) {
        :host {
          --ov-icon-size: var(--icon-md);
        }
      }

      input {
        display: block;
        width: 16px;
        height: var(--icon-md);
        margin-top: 4px;
      }

      [icon="cart-plus"] {
        padding-top: 6px;
        --ov-icon-color: var(--color-primary);
        --ov-icon-size: var(--icon-lg);
      }

      ov-icon {
        cursor: pointer;
      }

      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      input[type="number"] {
        -moz-appearance: textfield;
      }
    `,
  ];

  @property({ type: Number })
  amount!: number;

  private addToCart() {
    const event: AddToCartEvent = new CustomEvent("add-to-cart", {
      detail: {
        id: this.product.id,
        amount: this.amount,
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <ov-product .product=${this.product} ?priceLoading=${this.priceLoading}>
        <section slot="actions">
          <ov-quantity amount=${this.amount}></ov-quantity>
          <ov-icon
            icon="cart-plus"
            ?disabled=${this.amount === 0}
            @click=${this.addToCart}
          ></ov-icon>
        </section>
      </ov-product>
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "ov-product-in-stock": ProductInStock;
  }
}
