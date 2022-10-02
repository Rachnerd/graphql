import { Meta, Story } from "@storybook/web-components";
import { html } from "lit";
import { SubTitle } from "./subtitle";
import "./subtitle";

export default {
  title: "Components/Atoms/Subtitle",
  component: "ov-subtitle",
} as Meta;

const Template: Story<SubTitle> = () =>
  html`
    <ov-subtitle>Subtitle</ov-subtitle>
  `;

export const Primary = Template.bind({});
Primary.args = {};

const LineClampTemplate: Story<SubTitle & Record<"lineClamp", number>> = ({
  lineClamp,
}) =>
  html`
    <style>
      ov-subtitle {
        --ov-subtitle-line-clamp: ${lineClamp};
      }
    </style>
    <ov-subtitle>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut sodales
      augue, eget pellentesque urna. Duis eleifend enim quis velit posuere
      porttitor. Nam facilisis metus id turpis vehicula fermentum. Nunc
      sollicitudin blandit molestie. Vestibulum varius massa euismod massa
      egestas tincidunt. Proin laoreet odio vel sollicitudin imperdiet. Cras
      volutpat id odio id ultrices. Suspendisse sodales rutrum tortor, ultrices
      consectetur ante tincidunt sit amet. Donec laoreet arcu metus, at
      efficitur nibh placerat ac.
    </ov-subtitle>
  `;

export const LineClamp = LineClampTemplate.bind({});
LineClamp.args = {
  lineClamp: 2,
};
