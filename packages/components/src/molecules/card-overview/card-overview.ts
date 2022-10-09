import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

/**
 * @prop products
 */
@customElement("ov-card-overview")
export class CardOverview extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        display: grid;
        grid-template-columns: repeat(
          auto-fill,
          minmax(var(--ov-grid-min-column-width, 320px), 1fr)
        );
        grid-template-rows: auto auto;
        grid-gap: var(--space-sm);
      }

      ::slotted(*) {
        display: block;
        padding: var(--space-xs);
        box-shadow: var(--card-box-shadow);
      }
    `,
  ];

  render() {
    return html`
      <slot></slot>
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "ov-card-overview": CardOverview;
  }
}
