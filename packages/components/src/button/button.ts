import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * @attr variant
 * @attr disabled
 */
@customElement("wc-button")
export class Button extends LitElement {
  static styles = [
    css`
      :host {
        width: 100%;
      }

      button {
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        box-sizing: border-box;
        border: 1px solid;
        transition: all 100ms ease-in;
        width: 100%;

        padding: var(--space-xs);
        font-size: 14px;
        text-align: center;
        display: flex;
        justify-content: center;
      }

      button:disabled,
      button[disabled] {
        cursor: auto;
        opacity: 0.4;
      }

      .primary {
        color: white;
        background-color: var(--color-primary);
        border-color: var(--color-primary);
      }

      .primary:hover:enabled {
        background-color: var(--color-primary-dark);
      }

      .inverted {
        color: var(--color-primary);
        background-color: white;
        border-color: lightgrey;
      }

      .inverted:hover:enabled {
        border-color: var(--color-primary);
      }
    `,
  ];

  @property({ type: String })
  variant: "primary" | "inverted" = "primary";

  @property({ type: Boolean })
  disabled = false;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", this.haltDisabledEvents, true);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this.haltDisabledEvents);
  }

  private haltDisabledEvents = (event: Event): boolean => {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
    return true;
  };

  render() {
    return html`
      <button class="${this.variant}" ?disabled="${this.disabled}">
        <slot></slot>
      </button>
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "wc-button": Button;
  }
}
