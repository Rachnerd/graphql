import { Meta, Story } from "@storybook/web-components";
import { html } from "lit";
import { Price } from "./price";
import "./price";
import { ifDefined } from "lit-html/directives/if-defined";

export default {
  title: "Components/Atoms/Price",
  component: "ov-price",
} as Meta;

const Template: Story<Price> = ({ amount, currency, locale }) =>
  html`
    <ov-price
      amount="${amount}"
      currency=${ifDefined(currency)}
      locale=${ifDefined(locale)}
    ></ov-price>
  `;

export const Primary = Template.bind({});
Primary.args = {
  amount: 100,
};

export const Min = Template.bind({});
Min.args = {
  amount: 0.01,
};

export const Max = Template.bind({});
Max.args = {
  amount: 10000,
};
