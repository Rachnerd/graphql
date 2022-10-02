import { css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
  library,
  icon,
  Icon as FaIcon,
} from "@fortawesome/fontawesome-svg-core";
import {
  faStar,
  faStarHalfStroke,
  faPlusSquare,
  faMinusSquare,
} from "@fortawesome/free-regular-svg-icons";
import {
  faCartPlus,
  faEnvelope,
  faStar as faStarSolid,
} from "@fortawesome/free-solid-svg-icons";
import { MixinDisabled } from "src/_mixins/disabled";

library.add(faStar);
library.add(faStarSolid);
library.add(faCartPlus);
library.add(faStarHalfStroke);
library.add(faEnvelope);
library.add(faPlusSquare);
library.add(faMinusSquare);

export type SupportedIcon =
  | "minus"
  | "plus"
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
  minus: icon({ prefix: "far", iconName: "minus-square" }),
  plus: icon({ prefix: "far", iconName: "plus-square" }),
};

/**
 * @attr icon
 * @attr disabled
 */
@customElement("ov-icon")
export class Icon extends MixinDisabled(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
        color: var(--ov-icon-color);
        width: var(--ov-icon-size, var(--icon-md));
        height: var(--ov-icon-size, var(--icon-md));
      }

      svg[disabled] {
        opacity: 0.6;
      }
    `,
  ];

  @property({ type: String })
  icon!: SupportedIcon;

  render() {
    const svg = IconMap[this.icon].node[0];
    if (this.disabled) {
      svg.setAttribute("disabled", "");
    }
    return svg;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "ov-icon": Icon;
  }
}
