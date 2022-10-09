import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

/**
 */
@customElement("ov-subtitle")
export class SubTitle extends LitElement {
  static styles = [
    css`
      span {
        font-size: var(--font-sm);
        color: var(--color-primary);
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: var(--ov-subtitle-line-clamp);
        -webkit-box-orient: vertical;
      }
    `,
  ];

  render() {
    return html`
      <span>
        <slot></slot>
      </span>
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "ov-subtitle": SubTitle;
  }
}
