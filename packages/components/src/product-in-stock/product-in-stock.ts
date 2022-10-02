import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../product/product";
import "../icon/icon";
import { ProductData } from "../product/product";
import { classMap } from "lit/directives/class-map.js";

export type AddToCartEvent = CustomEvent<{ id: string; amount: number }>;

/**
 * @prop product
 * @attr amount
 */
@customElement("ov-product-in-stock")
export class ProductInStock extends LitElement {
  static styles = [
    css`
      section[slot="actions"] {
        --ov-icon-color: var(--color-primary);
        --ov-icon-size: var(--icon-lg);
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 4px;
      }

      input {
        display: block;
        width: 24px;
        height: var(--icon-md);
        margin-top: 4px;
      }

      [icon="cart-plus"] {
        padding-top: 6px;
      }

      ov-icon {
        cursor: pointer;
      }

      ov-icon.disabled {
        opacity: 0.4;
        cursor: auto;
      }
    `,
  ];

  @property({ type: Object })
  product!: ProductData;

  @property({ type: Number })
  amount!: number;

  private increment() {
    this.amount += 1;
  }

  private decrement() {
    this.amount -= 1;
  }

  private addToCart() {
    const addToCart: AddToCartEvent = new CustomEvent("add-to-cart", {
      detail: {
        id: this.product.id,
        amount: this.amount,
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(addToCart);
  }

  render() {
    return html`
      <ov-product .product=${this.product}>
        <section slot="actions">
          <ov-icon
            icon="minus"
            @click=${this.decrement}
            class=${classMap({
              disabled: this.amount <= 1,
            })}
          ></ov-icon>
          <input type="number" .value=${this.amount.toString()} readonly />
          <ov-icon
            icon="plus"
            class=${classMap({
              disabled: this.amount === 99,
            })}
            @click=${this.increment}
          ></ov-icon>
          <ov-icon
            icon="cart-plus"
            class=${classMap({
              disabled: this.amount === 0,
            })}
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
