import { Meta, Story } from "@storybook/web-components";
import { html } from "lit";
import { Quantity } from "./quantity";
import "./quantity";

export default {
  title: "Components/Molecules/Quantity",
  component: "ov-quantity",
  parameters: {
    actions: {
      handles: ["increment", "decrement"],
    },
  },
} as Meta;

const Template: Story<Quantity> = ({ amount }) => {
  return html`
    <ov-quantity amount=${amount}></ov-quantity>
  `;
};

export const Primary = Template.bind({});
Primary.args = {
  amount: 2,
};

export const Min = Template.bind({});
Min.args = {
  amount: 1,
};

export const Max = Template.bind({});
Max.args = {
  amount: 99,
};
