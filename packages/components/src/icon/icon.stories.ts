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
];

export default {
  title: "Components/Atoms/Icon",
  component: "wc-icon",
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
} as Meta;

const Template: Story<Icon & Record<"color" | "size", string>> = ({
  color,
  size,
  icon,
}) =>
  html`
    <style>
      wc-icon {
        --wc-icon-color: var(${color});
        --wc-icon-size: var(${size});
      }
    </style>
    <wc-icon icon="${icon}"></wc-icon>
  `;

export const Primary = Template.bind({});
Primary.args = {};

const SizesTemplate: Story<Icon & Record<"color", string>> = ({
  color,
  icon,
}) =>
  html`
    ${sizeOptions.map(
      (size, i) => html`
        <style>
          .${`icon-${i}`} {
            --wc-icon-size: var(${size});
            --wc-icon-color: var(${color});
          }
        </style>
        ${size}
        <wc-icon icon="${icon}" class="icon-${i}"></wc-icon>
      `
    )}
  `;

export const Sizes = SizesTemplate.bind({});

const ColorsTemplate: Story<Icon & Record<"size", string>> = ({ size, icon }) =>
  html`
    ${colorOptions.map(
      (color, i) => html`
        <style>
          .${`icon-${i}`} {
            --wc-icon-size: var(${size});
            --wc-icon-color: var(${color});
          }
        </style>
        ${color}
        <wc-icon icon="${icon}" class="icon-${i}"></wc-icon>
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
            --wc-icon-size: var(${size});
            --wc-icon-color: var(${color});
          }
        </style>
        ${icon}
        <wc-icon icon="${icon}" class="icon-${i}"></wc-icon>
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
