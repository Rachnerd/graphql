import { Meta, Story } from "@storybook/web-components";
import { html } from "lit";
import { ProductInCart } from "./product-in-cart";
import "./product-in-cart";
import { ProductMock } from "../product/product.mocks";

export default {
  title: "Components/Molecules/Product in cart",
  component: "ov-product-in-cart",
  parameters: {
    actions: {
      handles: ["remove-from-cart"],
    },
  },
} as Meta;

const Template: Story<ProductInCart> = ({ product }) => {
  return html`
    <ov-product-in-cart .product=${product}></ov-product-in-cart>
  `;
};

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
