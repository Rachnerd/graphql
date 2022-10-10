import { Meta, Story } from "@storybook/web-components";
import { html } from "lit";
import { CartProduct } from "./cart-product";
import "./cart-product";
import { ProductMock } from "../product/product.mocks";

export default {
  title: "Components/Molecules/Cart Product",
  component: "ov-cart-product",
  parameters: {
    actions: {
      handles: ["increment", "decrement", "remove-from-cart"],
    },
  },
} as Meta;

const Template: Story<CartProduct> = ({ product, amount }) => {
  return html`
    <ov-cart-product .product=${product} amount=${amount}></ov-cart-product>
  `;
};

export const Primary = Template.bind({});
Primary.args = {
  product: ProductMock.PRIMARY,
  amount: 2,
};

export const Min = Template.bind({});
Min.args = {
  product: ProductMock.MIN_CONTENT,
  amount: 1,
};

export const Max = Template.bind({});
Max.args = {
  product: ProductMock.MAX_CONTENT,
  amount: 99,
};
