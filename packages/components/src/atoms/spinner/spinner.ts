import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

/**
 *
 */
@customElement("ov-spinner")
export class Spinner extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      div {
        display: inline-block;
        width: var(--ov-spinner-size, 50px);
        height: var(--ov-spinner-size, 50px);
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: var(--color-primary, #fff);
        animation: spin 1s ease-in-out infinite;
        -webkit-animation: spin 1s ease-in-out infinite;
      }

      @keyframes spin {
        to {
          -webkit-transform: rotate(360deg);
        }
      }

      @-webkit-keyframes spin {
        to {
          -webkit-transform: rotate(360deg);
        }
      }
    `,
  ];

  render() {
    return html`
      <div></div>
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "ov-spinner": Spinner;
  }
}
