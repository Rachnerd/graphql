import { Meta, Story } from "@storybook/web-components";
import { html } from "lit";
import { DefaultTemplate } from "./main-template";
import "./main-template";

export default {
  title: "Components/Templates/Default Template",
  component: "ov-default-template",
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: Story<DefaultTemplate> = () => {
  return html`
    <ov-default-template>
      <div slot="header">Header</div>
      <div slot="side">Side</div>
      <div slot="main">Main</div>
      <div slot="footer">Footer</div>
    </ov-default-template>
  `;
};

export const Primary = Template.bind({});
Primary.args = {};
