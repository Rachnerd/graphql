import { Meta, Story } from "@storybook/web-components";
import { html } from "lit";
import { Button } from "./button";
import "./button";
import "../icon/icon";
import { ifDefined } from "lit/directives/if-defined.js";

export default {
  title: "Components/Button",
  component: "wc-button",
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["primary", "inverted"],
    },
  },
  parameters: {
    actions: {
      handles: ["click wc-button"],
    },
  },
} as Meta;

const Template: Story<Button & Record<"slot", string>> = ({
  slot,
  variant,
  disabled,
}) =>
  html`
    <wc-button variant="${ifDefined(variant)}" ?disabled="${disabled}">
      ${slot}
    </wc-button>
  `;

export const Primary = Template.bind({});
Primary.args = {
  title: "Title",
  variant: "primary",
  slot: "Ok",
};

export const Inverted = Template.bind({});
Inverted.args = {
  title: "Title",
  variant: "inverted",
  slot: "Ok",
};

const IconTemplate: Story<Button & Record<"slot", string>> = ({
  variant,
  disabled,
}) =>
  html`
    <style>
      wc-button {
        --wc-icon-size: var(--icon-md);
      }
    </style>
    <wc-button variant="${ifDefined(variant)}" ?disabled="${disabled}">
      <wc-icon icon="envelope"></wc-icon>
    </wc-button>
  `;

export const Icon = IconTemplate.bind({});

export const IconInverted = IconTemplate.bind({});
IconInverted.args = {
  variant: "inverted",
};
