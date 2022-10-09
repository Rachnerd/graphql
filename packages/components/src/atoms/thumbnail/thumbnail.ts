import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * @attr src
 * @attr alt
 */
@customElement("ov-thumbnail")
export class Thumbnail extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }

      img {
        width: var(--ov-thumbnail-size, 86px);
        height: var(--ov-thumbnail-size, 86px);
        object-fit: contain;
      }
    `,
  ];

  @property({ type: String })
  src!: string;

  @property({ type: String })
  alt!: string;

  render() {
    return html`
      <img src=${this.src} alt=${this.alt} />
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "ov-thumbnail": Thumbnail;
  }
}
