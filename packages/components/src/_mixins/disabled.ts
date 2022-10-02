import { LitElement } from "lit";
import { property } from "lit/decorators.js";

// eslint-disable-next-line
type Constructor<T = any> = new (...args: any[]) => T;

export interface DisabledInterface {
  disabled: boolean;
}

export const MixinDisabled = <T extends Constructor<LitElement>>(
  superClass: T
) => {
  class MixinDisabledClass extends superClass {
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
  }
  return MixinDisabledClass as Constructor<DisabledInterface> & T;
};
