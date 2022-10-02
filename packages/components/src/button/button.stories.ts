import { Meta, Story } from "@storybook/web-components";
import { html } from "lit";
import { Button } from "./button";
import "./button";
import "../icon/icon";
import { ifDefined } from "lit/directives/if-defined.js";

export default {
  title: "Components/Atoms/Button",
  component: "ov-button",
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["primary", "inverted"],
    },
  },
  parameters: {
    actions: {
      handles: ["click ov-button"],
    },
  },
} as Meta;

const Template: Story<Button & Record<"slot", string>> = ({
  slot,
  variant,
  disabled,
}) =>
  html`
    <ov-button variant="${ifDefined(variant)}" ?disabled="${disabled}">
      ${slot}
    </ov-button>
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
      ov-icon {
        --ov-icon-size: var(--icon-md);
      }
    </style>
    <ov-button variant="${ifDefined(variant)}" ?disabled="${disabled}">
      <ov-icon icon="envelope"></ov-icon>
    </ov-button>
  `;

export const Icon = IconTemplate.bind({});

export const IconInverted = IconTemplate.bind({});
IconInverted.args = {
  variant: "inverted",
};
