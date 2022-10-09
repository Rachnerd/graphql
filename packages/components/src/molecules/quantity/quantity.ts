import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../product/product";

export type IncrementEvent = CustomEvent<{ step: number }>;
export type DecrementEvent = CustomEvent<{ step: number }>;

/**
 * @prop product
 * @attr amount
 */
@customElement("ov-quantity")
export class Quantity extends LitElement {
  static styles = [
    css`
      :host {
        /* display: flex; */
        display: inline-block;
        position: relative;
        justify-content: center;
        align-items: center;
        gap: var(--space-xxs);

        --ov-icon-color: var(--color-primary);
        --ov-icon-size: var(--icon-lg);
      }

      input {
        width: 16px;
        /* height: var(--ov-icon-size); */
        /* height: var(--icon-md); */
      }

      ov-icon {
        vertical-align: middle;

        cursor: pointer;
        margin: 0 auto;
        margin-top: -4px;
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

  private increment() {
    const event: IncrementEvent = new CustomEvent("increment", {
      detail: {
        step: 1,
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private decrement() {
    const event: DecrementEvent = new CustomEvent("decrement", {
      detail: {
        step: 1,
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <ov-icon
        icon="minus"
        @click=${this.decrement}
        ?disabled=${this.amount <= 1}
      ></ov-icon>
      <input type="number" .value=${this.amount.toString()} readonly />
      <ov-icon
        icon="plus"
        ?disabled=${this.amount === 99}
        @click=${this.increment}
      ></ov-icon>
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "ov-quantity": Quantity;
  }
}
