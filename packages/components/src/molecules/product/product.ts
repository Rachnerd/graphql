import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "../../atoms/price/price";
import "../../atoms/title/title";
import "../../atoms/subtitle/subtitle";
import "../../atoms/thumbnail/thumbnail";
import "../../atoms/spinner/spinner";
import "../rating/rating";
import { MixinProduct } from "../../_mixins/product";

/**
 * @prop product
 * @attr priceLoading
 */
@customElement("ov-product")
export class Product extends MixinProduct(LitElement) {
  static styles = [
    css`
      :host {
        /* background-color: red; */
        display: block;
        --ov-subtitle-line-clamp: 1;
        --ov-title-line-clamp: 2;
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
      }

      ov-sub-title,
      ov-rating {
        display: block;
        margin-bottom: var(--space-xxs);
      }

      ov-thumbnail {
        width: 86px;
        height: 100%;
      }

      .description {
        overflow: hidden;

        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 0.8em;
      }

      .details {
        display: flex;
        width: 100%;
      }

      .details div {
        flex: 1;
      }

      ov-price {
        --ov-price-font-size: var(--font-xs);
        margin-bottom: 5px;
      }

      ov-spinner {
        --ov-spinner-size: 8px;
      }
    `,
  ];

  render() {
    const { image, title, category, rating, price } = this.product;
    return html`
      <section class="product">
        <ov-thumbnail src=${image} alt=${title}></ov-thumbnail>
        <div class="info">
          <ov-subtitle>${category}</ov-subtitle>
          <ov-title>${title}</ov-title>
          <div class="details">
            <div>
              <ov-rating rate=${rating.rate} count=${rating.count}></ov-rating>
              ${this.priceLoading || price === undefined
                ? html`
                    <ov-spinner></ov-spinner>
                  `
                : html`
                    <ov-price amount=${price}></ov-price>
                  `}
            </div>
            <div>
              <slot name="actions"></slot>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "ov-product": Product;
  }
}
