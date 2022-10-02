import { Meta, Story } from "@storybook/web-components";
import { html } from "lit";
import { Rating } from "./rating";
import "./rating";

export default {
  title: "Components/Atoms/Rating",
  component: "wc-rating",
} as Meta;

const Template: Story<Rating> = ({ rate, count }) =>
  html`
    <wc-rating rate=${rate} count=${count}></wc-rating>
  `;

export const Primary = Template.bind({});
Primary.args = {
  rate: 3.5,
  count: 20,
};
export const Max = Template.bind({});
Max.args = {
  rate: 5,
  count: 9999,
};

export const Min = Template.bind({});
Min.args = {
  rate: 0.1,
  count: 1,
};
