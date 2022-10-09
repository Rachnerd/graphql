import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

/**
 */
@customElement("ov-title")
export class Title extends LitElement {
  static styles = [
    css`
      span {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: var(--ov-title-line-clamp);
        font-weight: bold;
        line-height: 1.2em;
        cursor: pointer;
        color: black;
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
    "ov-title": Title;
  }
}
