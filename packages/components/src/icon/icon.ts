import { css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
  library,
  icon,
  Icon as FaIcon,
} from "@fortawesome/fontawesome-svg-core";
import { faStar, faStarHalfStroke } from "@fortawesome/free-regular-svg-icons";
import {
  faCartPlus,
  faEnvelope,
  faStar as faStarSolid,
} from "@fortawesome/free-solid-svg-icons";

library.add(faStar);
library.add(faStarSolid);
library.add(faCartPlus);
library.add(faStarHalfStroke);
library.add(faEnvelope);

export type SupportedIcon =
  | "cart-plus"
  | "star"
  | "star-half"
  | "star-open"
  | "envelope";

const IconMap: Record<SupportedIcon, FaIcon> = {
  "cart-plus": icon({ prefix: "fas", iconName: "cart-plus" }),
  star: icon({ prefix: "fas", iconName: "star" }),
  "star-open": icon({ prefix: "far", iconName: "star" }),
  "star-half": icon({ prefix: "far", iconName: "star-half-stroke" }),
  envelope: icon({ prefix: "fas", iconName: "envelope" }),
};

/**
 * @attr icon
 */
@customElement("ov-icon")
export class Icon extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        color: var(--ov-icon-color);
        width: var(--ov-icon-size, var(--icon-md));
        height: var(--ov-icon-size, var(--icon-md));
      }
    `,
  ];

  @property({ type: String })
  icon!: SupportedIcon;

  render() {
    return IconMap[this.icon].node;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "ov-icon": Icon;
  }
}
