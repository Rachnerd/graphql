import { Meta, Story } from "@storybook/web-components";
import { html } from "lit";
import { Title } from "./title";
import "./title";

export default {
  title: "Components/Atoms/Title",
  component: "ov-title",
} as Meta;

const Template: Story<Title> = () =>
  html`
    <ov-title>Title</ov-title>
  `;

export const Primary = Template.bind({});
Primary.args = {};

const LineClampTemplate: Story<Title & Record<"lineClamp", number>> = ({
  lineClamp,
}) =>
  html`
    <style>
      ov-title {
        --ov-title-line-clamp: ${lineClamp};
      }
    </style>
    <ov-title>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut sodales
      augue, eget pellentesque urna. Duis eleifend enim quis velit posuere
      porttitor. Nam facilisis metus id turpis vehicula fermentum. Nunc
      sollicitudin blandit molestie. Vestibulum varius massa euismod massa
      egestas tincidunt. Proin laoreet odio vel sollicitudin imperdiet. Cras
      volutpat id odio id ultrices. Suspendisse sodales rutrum tortor, ultrices
      consectetur ante tincidunt sit amet. Donec laoreet arcu metus, at
      efficitur nibh placerat ac.
    </ov-title>
  `;

export const LineClamp = LineClampTemplate.bind({});
LineClamp.args = {
  lineClamp: 2,
};
