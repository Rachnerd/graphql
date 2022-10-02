import { Meta, Story } from "@storybook/web-components";
import { html } from "lit";
import { Icon, SupportedIcon } from "./icon";
import "./icon";

const sizeOptions = [
  "--icon-xxs",
  "--icon-xs",
  "--icon-sm",
  "--icon-md",
  "--icon-lg",
  "--icon-xl",
  "--icon-xxl",
];

const colorOptions = ["--color-primary", "--color-secondary"];

const iconOptions: SupportedIcon[] = [
  "cart-plus",
  "star",
  "star-half",
  "star-open",
  "envelope",
  "minus",
  "plus",
];

export default {
  title: "Components/Atoms/Icon",
  component: "ov-icon",
  argTypes: {
    color: {
      control: "select",
      options: colorOptions,
      defaultValue: "--color-primary",
    },
    size: {
      control: "select",
      options: sizeOptions,
      defaultValue: "--icon-lg",
    },
    icon: {
      control: "select",
      options: iconOptions,
      defaultValue: "cart-plus",
    },
  },
  parameters: {
    actions: {
      handles: ["click ov-icon"],
    },
  },
} as Meta;

const Template: Story<Icon & Record<"color" | "size", string>> = ({
  color,
  size,
  icon,
  disabled,
}) =>
  html`
    <style>
      ov-icon {
        --ov-icon-color: var(${color});
        --ov-icon-size: var(${size});
      }
    </style>
    <ov-icon icon=${icon} ?disabled=${disabled}></ov-icon>
  `;

export const Primary = Template.bind({});
Primary.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

const SizesTemplate: Story<Icon & Record<"color", string>> = ({
  color,
  icon,
}) =>
  html`
    ${sizeOptions.map(
      (size, i) => html`
        <style>
          .${`icon-${i}`} {
            --ov-icon-size: var(${size});
            --ov-icon-color: var(${color});
          }
        </style>
        ${size}
        <ov-icon icon="${icon}" class="icon-${i}"></ov-icon>
      `
    )}
  `;

export const Sizes = SizesTemplate.bind({});

const ColorsTemplate: Story<Icon & Record<"size", string>> = ({ size, icon }) =>
  html`
    ${colorOptions.map(
      (color, i) => html`
        <style>
          .${`icon-color-${i}`} {
            --ov-icon-size: var(${size});
            --ov-icon-color: var(${color});
          }
        </style>
        ${color}
        <ov-icon icon="${icon}" class="icon-color-${i}"></ov-icon>
      `
    )}
  `;

export const Colors = ColorsTemplate.bind({});

const IconTemplate: Story<Icon & Record<"size" | "color", string>> = ({
  size,
  color,
}) =>
  html`
    ${iconOptions.map(
      (icon, i) => html`
        <style>
          .${`icon-${i}`} {
            --ov-icon-size: var(${size});
            --ov-icon-color: var(${color});
          }
        </style>
        ${icon}
        <ov-icon icon="${icon}" class="icon-${i}"></ov-icon>
      `
    )}
  `;

export const Icons = IconTemplate.bind({});

Icons.argTypes = {
  icon: {
    table: {
      disabled: true,
    },
  },
};
