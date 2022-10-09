import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

/**
 */
@customElement("ov-default-template")
export class DefaultTemplate extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }

      .content {
        max-width: 1168px;
        margin: auto;
        display: flex;
      }

      .side {
        width: 218px;
      }

      .main {
        flex: 1;
      }
    `,
  ];

  render() {
    return html`
      <section class="header">
        <slot name="header"></slot>
      </section>
      <section class="content">
        <div class="side">
          <slot name="side"></slot>
        </div>
        <div class="main">
          <slot name="main"></slot>
        </div>
      </section>
      <section class="footer">
        <slot name="footer"></slot>
      </section>
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "ov-default-template": DefaultTemplate;
  }
}
