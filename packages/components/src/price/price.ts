import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * @attr amount
 * @attr currency
 * @attr locale
 */
@customElement("wc-price")
export class Price extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        color: var(--wc-price-color, var(--color-primary));
      }
    `,
  ];

  @property({ type: Number })
  amount!: number;

  @property({ type: String })
  locale = "nl-NL";

  @property({ type: String })
  currency = "EUR";

  render() {
    const formatter = new Intl.NumberFormat(this.locale, {
      style: "currency",
      currency: this.currency,
    });
    return html`
      <span>${formatter.format(this.amount)}</span>
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "wc-price": Price;
  }
}
