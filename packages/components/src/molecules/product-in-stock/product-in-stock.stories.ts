import { Meta, Story } from "@storybook/web-components";
import { html } from "lit";
import { ProductInStock } from "./product-in-stock";
import "./product-in-stock";
import { ProductMock } from "../product/product.mocks";

export default {
  title: "Components/Molecules/Product in stock",
  component: "ov-product-in-stock",
  parameters: {
    actions: {
      handles: ["add-to-cart", "increment", "decrement"],
    },
  },
} as Meta;

const Template: Story<ProductInStock> = ({ product, amount }) => {
  return html`
    <ov-product-in-stock
      .product=${product}
      amount=${amount}
    ></ov-product-in-stock>
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
