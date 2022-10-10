import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../../atoms/price/price";
import "../../atoms/title/title";
import "../../atoms/thumbnail/thumbnail";
import "../quantity/quantity";
import "../../atoms/spinner/spinner";
import { ProductData } from "../../_mixins/product";

export type CartProductRemoveEvent = CustomEvent<void>;

/**
 * @prop product
 * @attr amount
 */
@customElement("ov-cart-product")
export class CartProduct extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        --ov-title-line-clamp: 1;
      }

      .product {
        display: flex;
        height: var(--product-height);
        overflow: hidden;

        padding: calc(var(--product-padding) * 0.5);
      }

      .info {
        width: 100%;
        padding-left: var(--space-xs);
        display: flex;
        flex-direction: column;
        gap: var(--space-xs);
      }

      ov-thumbnail {
        --ov-thumbnail-size: 52px;
      }

      ov-quantity,
      ov-icon {
        --ov-icon-color: var(--color-primary);
        --ov-icon-size: var(--icon-lg);
        cursor: pointer;
      }

      .details {
        display: flex;
        flex-direction: column;
        gap: var(--space-xs);
      }

      .actions {
        display: flex;
        gap: var(--space-xxs);
      }

      .total-price {
        font-size: var(--font-xs);
        display: flex;
        flex-direction: column;
      }

      ov-price {
        --ov-price-font-size: var(--font-xs);
        display: inline;
      }

      ov-spinner {
        --ov-spinner-size: 8px;
      }
    `,
  ];

  @property({ type: Object })
  product!: Pick<ProductData, "image" | "title" | "price">;

  @property({ type: Number })
  amount!: number;

  private removeFromCart() {
    const event: CartProductRemoveEvent = new CustomEvent("remove-from-cart", {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <section class="product">
        <ov-thumbnail
          src=${this.product.image}
          alt=${this.product.title}
        ></ov-thumbnail>
        <div class="info">
          <ov-title>${this.product.title}</ov-title>
          <div class="details">
            <div class="actions">
              <ov-quantity amount=${this.amount}></ov-quantity>
              <ov-icon icon="trash" @click=${this.removeFromCart}></ov-icon>
            </div>
            ${this.product.price
              ? html`
                  <div class="total-price">
                    <div>
                      <span>${this.amount} *</span>
                      <ov-price amount=${this.product.price}></ov-price>
                    </div>
                    <ov-price
                      amount=${(this.amount * (this.product.price * 1000)) /
                      1000}
                    ></ov-price>
                  </div>
                `
              : html`
                  <ov-spinner></ov-spinner>
                `}
          </div>
        </div>
      </section>
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "ov-cart-product": CartProduct;
  }
}
