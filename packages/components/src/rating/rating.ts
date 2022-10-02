import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../icon/icon";

const STAR_AMOUNT = 5;

/**
 * @attr rate
 * @attr count
 */
@customElement("ov-rating")
export class Rating extends LitElement {
  static styles = [
    css`
      div {
        color: orange;
        display: flex;
        align-items: center;
      }
      .count {
        font-size: var(--font-sm);
        padding-left: var(--space-xxs);
        color: black;
      }
    `,
  ];

  @property({ type: Number })
  rate!: number;

  @property({ type: Number })
  count!: number;

  private createStars() {
    const roundRate = Math.round(this.rate * 2) / 2;
    const rate = Math.max(roundRate, 1);
    return Array.from({ length: STAR_AMOUNT }, (_, i) => rate - i).map(
      (delta) => {
        return delta >= 1
          ? html`
              <ov-icon icon="star"></ov-icon>
            `
          : delta === 0.5
          ? html`
              <ov-icon icon="star-half"></ov-icon>
            `
          : html`
              <ov-icon icon="star-open"></ov-icon>
            `;
      }
    );
  }

  render() {
    return html`
      <div>
        ${this.createStars()}
        <span class="count">(${this.count})</span>
      </div>
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "ov-rating": Rating;
  }
}
