import { Meta, Story } from "@storybook/web-components";
import { html } from "lit";
import { Spinner } from "./spinner";
import "./spinner";

export default {
  title: "Components/Atoms/Spinner",
  component: "ov-spinner",
} as Meta;

const Template: Story<Spinner> = () =>
  html`
    <style>
      :root {
        --ov-spinner-color: var(--color-primary);
      }
    </style>
    <ov-spinner></ov-spinner>
  `;

export const Primary = Template.bind({});
Primary.args = {};
