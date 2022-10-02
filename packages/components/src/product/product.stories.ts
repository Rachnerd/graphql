import { Meta, Story } from "@storybook/web-components";
import { html } from "lit";
import { Product } from "./product";
import "./product";
import { ProductMock } from "./product.mocks";

export default {
  title: "Components/Molecules/Product",
  component: "ov-product",
} as Meta;

const Template: Story<Product> = ({ product }) =>
  html`
    <style>
      section {
        height: 100%;
        border: 1px solid black;
        display: flex;
        box-sizing: border-box;
        justify-content: center;
        align-items: center;
      }
    </style>
    <ov-product .product=${product}>
      <section slot="actions"><span>&lt;Actions slot&gt;</span></section>
      <section slot="footer">&lt;Footer slot&gt;</section>
    </ov-product>
  `;

export const Primary = Template.bind({});
Primary.args = {
  product: ProductMock.PRIMARY,
};

export const Min = Template.bind({});
Min.args = {
  product: ProductMock.MIN_CONTENT,
};

export const Max = Template.bind({});
Max.args = {
  product: ProductMock.MAX_CONTENT,
};

export const Landscape = Template.bind({});
Landscape.args = {
  product: ProductMock.LANDSCAPE,
};
