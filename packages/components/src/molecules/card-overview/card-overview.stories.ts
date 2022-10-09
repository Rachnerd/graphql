import { Meta, Story } from "@storybook/web-components";
import { html } from "lit";
import "./card-overview";
import { CardOverview } from "./card-overview";

export default {
  title: "Components/Molecules/Card Overview",
  component: "ov-card-overview",
  parameters: {
    layout: "fullscreen",
    actions: {
      handles: [
        "add-to-cart",
        "increment",
        "decrement",
        "remove-from-cart",
        "cart",
      ],
    },
  },
} as Meta;

const Template: Story<CardOverview> = () => {
  return html`
    <ov-card-overview>
      <span>Card content</span>
      <span>Card content</span>
      <span>Card content</span>
      <span>Card content</span>
      <span>Card content</span>
      <span>Card content</span>
    </ov-card-overview>
  `;
};

export const Primary = Template.bind({});
Primary.args = {};
