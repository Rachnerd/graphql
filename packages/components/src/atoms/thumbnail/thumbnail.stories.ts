import { Meta, Story } from "@storybook/web-components";
import { html } from "lit";
import { Thumbnail } from "./thumbnail";
import "./thumbnail";

export default {
  title: "Components/Atoms/Thumbnail",
  component: "ov-thumbnail",
} as Meta;

const Template: Story<Thumbnail> = ({ src, alt }) =>
  html`
    <ov-thumbnail src=${src} alt=${alt}>Title</ov-thumbnail>
  `;

export const Portrait = Template.bind({});
Portrait.args = {
  src: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  alt: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
};

export const Landscape = Template.bind({});
Landscape.args = {
  src: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
  alt: "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
};
