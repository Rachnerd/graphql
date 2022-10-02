import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../price/price";
import "../title/title";
import "../subtitle/subtitle";
import "../thumbnail/thumbnail";
import "../rating/rating";

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

/**
 * @prop product
 */
@customElement("ov-product")
export class Product extends LitElement {
  static styles = [
    css`
      :host {
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
        margin-bottom: var(--space-xs);
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
        margin-bottom: var(--space-xs);
        width: 100%;
      }

      .details div {
        flex: 1;
      }

      .footer {
        flex: 1;
      }
    `,
  ];

  @property({ type: Object })
  product!: ProductData;

  render() {
    const { image, title, subtitle, rating, price } = this.product;
    return html`
      <section class="product">
        <ov-thumbnail src=${image} alt=${title}></ov-thumbnail>
        <div class="info">
          <ov-subtitle>${subtitle}</ov-subtitle>
          <ov-title>${title}</ov-title>
          <div class="details">
            <div>
              <ov-rating rate=${rating.rate} count=${rating.count}></ov-rating>
              <ov-price amount=${price}></ov-price>
            </div>
            <div>
              <slot name="actions"></slot>
            </div>
          </div>
          <div class="footer">
            <slot name="footer"></slot>
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
